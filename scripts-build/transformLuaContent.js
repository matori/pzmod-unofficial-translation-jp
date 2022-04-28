import luaParser from 'luaparse';
import { traverse } from '@textlint/ast-traverse';

const BREAK = '\n';
const SEP = ',';

function transformGeneralContent(originalContentBuffer) {
  const originalContent = originalContentBuffer.toString();
  const ast = luaParser.parse(originalContent, { comments: false });
  const result = [];
  let prevNode;
  let temp = [];
  traverse(ast, {
    enter(node, parent) {
      // 一番最初の変数宣言
      if (node.type === 'Identifier' && parent.type === 'AssignmentStatement') {
        result.unshift(BREAK);
        result.unshift(`${node.name} = {`);
      }
      // 通常のテーブルキー
      // Table = { foo = "bar" }
      if (node.type === 'Identifier' && parent.type === 'TableKeyString') {
        const keyString = createKeyString(node.name);
        result.push(keyString);
      }

      // "foo" .. "bar" のルートとなる場所
      if (node.type === 'BinaryExpression' && parent.type !== 'BinaryExpression') {
        temp = [];
      }

      if (node.type === 'StringLiteral') {
        if (parent.type === 'TableKey') {
          const stripped = stripQuotes(node.raw);
          // 文字列指定のテーブルキー
          // Table = { ["foo"] = "bar" }
          if (prevNode.type === 'TableKey') {
            const keyString = createKeyString(stripped);
            result.push(keyString);
          } else {
            const valueText = formatPZTag(stripped);
            result.push(`"${valueText}"`);
            result.push(SEP);
            result.push(BREAK);
          }
        } else {
          const stripped = stripQuotes(node.raw);
          // "foo" .. "bar" の文字列
          if (parent.type === 'BinaryExpression' && parent.operator === '..') {
            temp.push(stripped);
          } else {
            const valueText = formatPZTag(stripped);
            result.push(`"${valueText}"`);
            result.push(SEP);
            result.push(BREAK);
          }
        }
      }
      prevNode = node;
    },
    leave(node, parent) {
      if (node.type === 'Chunk') {
        result.push(`}`);
        result.push(BREAK);
      }

      if (node.type === 'BinaryExpression' && parent.type !== 'BinaryExpression') {
        const baseText = temp.join('');
        const valueText = formatPZTag(baseText);
        result.push(`"${valueText}"`);
        result.push(SEP);
        result.push(BREAK);
      }
    },
  });

  const content = result.join('');
  return Buffer.from(content, 'utf8');
}

function transformTownDescription(originalContentBuffer) {
  const originalContent = originalContentBuffer.toString().trim();
  const ast = luaParser.parse(originalContent, { comments: false });
  let base;
  traverse(ast, {
    enter(node, parent) {
      if (node.type === 'BinaryExpression' && parent.type !== 'BinaryExpression') {
        base = [];
      }
      if (node.type === 'StringLiteral') {
        const stripped = node.raw.replace(/^['"]|['"]$/g, '');
        base.push(stripped);
      }
    },
    leave(node) {},
  });

  const contentText = base.join('');
  const content = formatPZTag(contentText);
  return Buffer.from(content, 'utf8');
}

function createKeyString(key) {
  const text = `${key} = `;
  return text.padStart(text.length + 4);
}

function stripQuotes(text) {
  return text.replace(/(^['"]|['"]$)/g, '');
}

function formatPZTag(text) {
  const split = text.split(/(<(?:[A-Z0-9]+(?:\:[\w,\.\/]+)?|w?br)>)/);
  // 空文字が出るので除去する
  const filtered = split.filter((text) => text.length);
  const contents = filtered.map(formatTextWithPZTag);
  return contents.join('');
}

// TODO: 空のタグでよさそうなので、調整する
function formatTextWithPZTag(text, index, arr) {
  const specialSpace = '\u{2005}';
  if (text === '<L>') {
    return `${specialSpace} <> `;
  }
  if (text === '<C>') {
    return `${specialSpace} <> `;
  }
  if (text === '<wbr>') {
    return `${specialSpace} <> `;
  }
  if (text === '<br>') {
    return '<br>';
  }
  if (isPZTag(text)) {
    const prev = arr[index - 1];
    const isPrevPZTag = prev && isPZTag(prev);
    const prefix = prev && !isPrevPZTag ? ' ' : '';
    return prefix + text + ' ';
  } else {
    return text.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
}

function isPZTag(text) {
  return /^<[A-Z0-9]+?/.test(text);
}

export { transformGeneralContent, transformTownDescription };
