import fs from 'fs';
import path from 'path';
import { src, dest } from './dir.js';
import { getAllFiles } from './gerAllFiles.js';
import { transformGeneralContent, transformTownDescription } from './transformLuaContent.js';
import { transformWorkshopText, transformModInfo } from './transformInformationContent.js';
import { contentTypeData, detectFileContentType } from './detectFileContentType.js';

function copy(src, dest) {
  const srcFilePaths = getAllFiles(src);
  srcFilePaths.forEach((filePath) => {
    copyFileRecursively(filePath, dest);
  });
}

function copyFileRecursively(srcFilePath, destBase) {
  const paths = srcFilePath.split(path.sep);

  // ファイル作成前のディレクトリ作成処理
  paths.shift();
  paths.unshift(destBase);
  const destPathBase = paths.join(path.sep);
  const destPath = path.normalize(destPathBase);
  const destDir = path.dirname(destPath);
  const existDir = fs.existsSync(destDir);

  if (/description\.txt/.test(srcFilePath)) {
    return;
  }

  if (!existDir) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const output = {
    filePath: destPath,
    data: fs.readFileSync(srcFilePath),
  };

  const contentType = detectFileContentType(srcFilePath);

  // ファイルに応じた変換処理やリネーム
  switch (contentType) {
    case contentTypeData.WORKSHOP_TEXT:
      output.data = transformWorkshopText(output.data);
      break;
    case contentTypeData.MOD_INFO:
      output.data = transformModInfo(output.data);
      break;
    case contentTypeData.TOWN_DESCRIPTION_LUA:
      output.filePath = destPath.replace(/\.towndesc\.lua$/, '.txt');
      output.data = transformTownDescription(output.data);
      break;
    case contentTypeData.GENERAL_LUA:
      output.filePath = destPath.replace(/\.general\.lua$/, '.txt');
      output.data = transformGeneralContent(output.data);
      break;
  }

  fs.writeFileSync(output.filePath, output.data);
}

copy(src, dest);
