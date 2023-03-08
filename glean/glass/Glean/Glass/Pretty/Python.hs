{-
  Copyright (c) Meta Platforms, Inc. and affiliates.
  All rights reserved.

  This source code is licensed under the BSD-style license found in the
  LICENSE file in the root directory of this source tree.
-}

{-# LANGUAGE TypeApplications, ApplicativeDo #-}

module Glean.Glass.Pretty.Python
  (
    prettyPythonSignature
  ) where

import Data.Maybe
import Data.Map.Strict ( Map )
import qualified Data.Map.Strict as Map
import Data.Text ( Text, takeWhileEnd )
import Data.Text.Prettyprint.Doc

import qualified Glean
import Glean.Angle as Angle
import qualified Glean.Haxl.Repos as Glean
import Glean.Util.ToAngle ( ToAngle(toAngle) )
import Glean.Glass.Types ( SymbolId )
import Glean.Glass.Utils

import Glean.Schema.CodePython.Types as Python ( Entity(..) )
import qualified Glean.Schema.Python.Types as Python
import qualified Glean.Schema.Src.Types as Src

-- Type of Python entity signatures to capture the the subset we generate
-- We use this to separate the processing of the Glean type from the text
-- we wish to generate

-- Python symbol kinds
data Definition
  = Function !AsyncModifier !Name [Parameter] !(Maybe PyType)
 -- Class
 -- Variable
 -- Import
 -- Module
 deriving Show

data Parameter = Parameter !Name (Maybe ExprText) !(Maybe PyType) XRefs
 deriving Show

-- modifiers
data AsyncModifier = Async | NotAsync
 deriving (Eq, Show)

newtype ExprText = ExprText Text
 deriving Show

-- names
newtype Name = Name Text
 deriving Show

newtype PyType = PyType Text
 deriving Show

type XRefs = [(Python.Declaration, Src.ByteSpan)]

type Ann = Maybe Python.Declaration

prettyPythonSignature
  :: LayoutOptions
  -> Python.Entity
  -> Glean.RepoHaxl u w (Maybe (SimpleDocStream (Maybe SymbolId)))
prettyPythonSignature opts (Python.Entity_decl decl) = do
  mQuery <- fetchDataRecursive (angleDeclToDef (toAngle decl))
  case mQuery of
    Nothing -> return Nothing
    Just pyDef -> do
      mDef <- fromAngleDefinition pyDef
      return $ case mDef of
        Nothing -> Nothing
        Just def -> Just (doLayout (pprDefinition def))
  where
    doLayout doc = reAnnotateS (const Nothing) (layoutSmart opts doc)

prettyPythonSignature _ Python.Entity_EMPTY = return Nothing

fromAngleDefinition
  :: Python.Definition -> Glean.RepoHaxl u w (Maybe Definition)
fromAngleDefinition def = case def of
  Python.Definition_func fn -> Just <$>
    (fromFunctionDefinition =<< Glean.keyOf fn)
  _ -> pure Nothing

fromFunctionDefinition
  :: Python.FunctionDefinition_key -> Glean.RepoHaxl u w Definition
fromFunctionDefinition def = do
  Python.FunctionDeclaration_key name <- Glean.keyOf decl
  returnTy <- case mReturnTy of
    Nothing -> pure Nothing
    Just tyInfo -> Just <$> fromTypeInfo tyInfo

  paramsAndXRefs <- mapM (\x -> case Python.parameter_typeInfo x of
    Nothing -> pure (x, [])
    Just ti -> (x,) <$> fetchDeclsByNames (Python.typeInfo_xrefs ti)
    ) pyParams

  nameStr <- Glean.keyOf name

  params <- mapM fromParameter paramsAndXRefs
  return $ Function
    (if async then Async else NotAsync)
    (trimModule nameStr)
    params
    returnTy
  where
    Python.FunctionDefinition_key {
      functionDefinition_key_declaration = decl,
      functionDefinition_key_is_async = async,
      functionDefinition_key_params = pyParams,
      functionDefinition_key_returnsInfo = mReturnTy
    } = def

fromTypeInfo  :: Python.TypeInfo -> Glean.RepoHaxl u w PyType
fromTypeInfo Python.TypeInfo{..} = PyType <$> Glean.keyOf
  typeInfo_displayType

fromParameter
   :: (Python.Parameter, [(Python.Declaration, Src.ByteSpan)])
   -> Glean.RepoHaxl u w Parameter
fromParameter (Python.Parameter{..}, xrefs) = do
  nameStr <- Glean.keyOf parameter_name
  tyInfo <- case parameter_typeInfo of
    Nothing -> return Nothing
    Just ty -> Just <$> fromTypeInfo ty
  return $ Parameter (Name nameStr) (ExprText <$> parameter_value) tyInfo xrefs

pprDefinition :: Definition -> Doc Ann
-- empty param case
pprDefinition (Function async name [] returnTy) =
  hcat [
   pprAsync async, "def" <+> pprName name, "()",
   case returnTy of
      Nothing -> emptyDoc
      Just ty -> space <> "->" <+> pprTypeXRefs ty []
  ]
-- full param list
pprDefinition (Function async name params returnTy) =
  vcat [
    nest 4 (vsep (
      hcat [pprAsync async, "def" <> space, pprName name <> lparen] :
      punctuate comma (map pprParam params)
    )),
    rparen <+> case returnTy of
      Nothing -> emptyDoc
      Just ty -> "->" <+> pprTypeXRefs ty []
    ]

pprAsync :: AsyncModifier -> Doc Ann
pprAsync Async = "async" <> space
pprAsync _ = emptyDoc

pprParam :: Parameter -> Doc Ann
pprParam (Parameter name _mDefValue mty xrefs) = hcat
  [ pprName name
  , case mty of
    Nothing -> emptyDoc
    Just ty -> colon <+> pprTypeXRefs ty xrefs
  ]

pprName :: Name -> Doc Ann
pprName (Name name) = pretty name

pprTypeXRefs :: PyType -> XRefs -> Doc Ann
pprTypeXRefs (PyType ty) xrefs =
    mconcat $ (\(frag, ann) -> annotate ann $ pretty frag) <$>
      splitString ty spans
  where
    spans = map (\(ann, Src.ByteSpan{..}) ->
               (ann, fromIntegral (Glean.fromNat byteSpan_start)
                   , fromIntegral (Glean.fromNat byteSpan_length))) xrefs

fetchDeclsByNames
  :: [Python.XRefViaName]
  -> Glean.RepoHaxl u w [(Python.Declaration,Src.ByteSpan)]
fetchDeclsByNames [] = pure []
fetchDeclsByNames xrefs = do
  result <- searchRecursiveWithLimit maxXRefs (angleDeclsByNames names)
  decls <- mapM Glean.keyOf result
  return $ mapMaybe (\Python.DeclarationWithName_key{..} ->
    case Map.lookup declarationWithName_key_name xrefTable of
      Nothing -> Nothing
      Just span -> Just (declarationWithName_key_declaration, span)
    ) decls
  where
    maxXRefs = Just 10

    xrefTable :: Map Python.Name Src.ByteSpan
    xrefTable = Map.fromList
      [ (xRefViaName_target, xRefViaName_source)
      | Python.XRefViaName{..} <- xrefs
      ]

    names :: [Glean.IdOf Python.Name]
    names = map Glean.getId (Map.keys xrefTable)


angleDeclToDef :: Angle Python.Declaration -> Angle Python.Definition
angleDeclToDef decl = var $ \(def :: Angle Python.Definition) ->
  def `where_` [
    wild .= predicate @Python.DeclarationDefinition (
      rec $
        field @"declaration" decl $
        field @"definition" def
      end
    )
  ]

-- Bulk convert each name to its definition entity
angleDeclsByNames
  :: [Glean.IdOf Python.Name] -> Angle Python.DeclarationWithName
angleDeclsByNames names = predicate @Python.DeclarationWithName $
  rec $
    field @"name" (elementsOf (array (map (asPredicate . factId) names)))
  end

-- | we could use the sname here to lookup the associated decl fact
-- as an xref in the type signature (c.f how Hack does this)
trimModule :: Text -> Name
trimModule qname = Name (takeWhileEnd (/= '.') qname)
