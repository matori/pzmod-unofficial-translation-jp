import fs from 'fs';
import path from 'path';

function getAllFiles(directoryPath) {
  const files = getFilesRecursively(directoryPath);
  const flattened = flatten(files);
  flattened.sort((a, b) => a - b);
  return flattened;
}

function getFilesRecursively(directoryPath) {
  const filesInDirectory = fs.readdirSync(directoryPath);
  const files = filesInDirectory.map((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      return getFilesRecursively(filePath);
    } else {
      return filePath;
    }
  });

  return files.filter((file) => file.length);
}

// Code from MDN
// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_a_stack
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

export { getAllFiles };
