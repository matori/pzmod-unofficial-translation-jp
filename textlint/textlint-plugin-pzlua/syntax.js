const { ASTNodeTypes } = require('@textlint/ast-node-types');

const Syntax = {
  Document: ASTNodeTypes.Document,
  Paragraph: ASTNodeTypes.Paragraph,
  Comment: ASTNodeTypes.Comment,
  Str: ASTNodeTypes.Str,
  Break: ASTNodeTypes.Break,
  // Project specific (none-effect)
  Element: 'Element',
};

module.exports = {
  Syntax,
};
