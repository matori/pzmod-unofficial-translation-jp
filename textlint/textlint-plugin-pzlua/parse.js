const luaParser = require('luaparse');
const { traverse } = require('@textlint/ast-traverse');
const { Syntax } = require('./syntax.js');

const luaParserOptions = {
  locations: true,
  ranges: true,
  comments: false,
};

function parse(text) {
  const luaAST = luaParser.parse(text, luaParserOptions);
  const AST = {
    ...luaAST,
    type: Syntax.Document,
    raw: text,
  };

  delete AST.body;
  const children = [];

  let prevNode;
  traverse(luaAST, {
    enter(node, parent) {
      if (node.type === 'StringLiteral') {
        if (parent.type !== 'TableKey' || (parent.type === 'TableKey' && prevNode.type !== 'TableKey')) {
          const paragraph = createParagraphNode(node);
          children.push(paragraph);
        }
      }
      prevNode = node;
    },
    leave(node, parent) {},
  });

  AST.children = children;
  return AST;
}

function createParagraphNode(stringLiteralNode) {
  const paragraph = {
    ...stringLiteralNode,
    type: Syntax.Paragraph,
    children: createParagraphChildNodes(stringLiteralNode),
  };
  delete paragraph.value;
  return paragraph;
}

function createParagraphChildNodes(paragraph) {
  const { raw, loc, range } = paragraph;
  const stripped = raw.slice(1, -1);
  const split = stripped.split(/(<(?:[A-Z0-9]+(?:\:[\w,\.\/]+)?|br)>)/);
  const filtered = split.filter((text) => text.length);
  const initialAcc = {
    relativeStart: 1,
    children: [],
  };
  const data = filtered.reduce(paragraphChildrenReducer.bind(null, loc, range), initialAcc);
  return data.children;
}

function paragraphChildrenReducer(loc, range, acc, text) {
  const node = {
    raw: text,
    loc: {
      start: {
        line: loc.start.line,
        column: loc.start.column + acc.relativeStart,
      },
      end: {
        line: loc.end.line,
        column: loc.start.column + acc.relativeStart + text.length,
      },
    },
    range: [range[0] + acc.relativeStart, range[0] + acc.relativeStart + text.length],
  };
  if (/<br>/i.test(text)) {
    node.type = Syntax.Break;
  } else if (/<[A-Z0-9]+(?:\:[\w,\.\/]+)?/.test(text)) {
    node.type = Syntax.Element;
  } else {
    node.type = Syntax.Str;
    node.value = text;
  }
  acc.relativeStart = acc.relativeStart + text.length;
  acc.children.push(node);
  return acc;
}

module.exports = {
  parse,
};
