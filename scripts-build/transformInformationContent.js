import info from './info.js';

function createHeaders() {
  const title = info.name;
  const headers = info.workshop;
  return Object.keys(headers).reduce((result, key, index) => {
    result.push(`${key}=${headers[key]}`);
    if (index === 0) {
      result.push(`title=${title}`);
    }
    return result;
  }, []);
}

function createDescription(text) {
  const textArr = text.split('\n');
  return textArr.map((line) => `description=${line}`);
}

function transformWorkshopText(originalContentBuffer) {
  const originalContent = originalContentBuffer.toString();
  const content = [...createHeaders(), ...createDescription(originalContent)].join('\n');
  return Buffer.from(content, 'utf8');
}

function transformModInfo(originalContentBuffer) {
  const { name, modInfo } = info;
  const { id, description } = modInfo;
  const data = {
    name,
    id,
    description,
  };

  const originalContent = originalContentBuffer.toString();
  const output = Object.keys(data).reduce((result, key) => {
    result.push(`${key}=${data[key]}`);
    return result;
  }, []);
  output.push(originalContent);
  const content = output.join('\n');
  return Buffer.from(content, 'utf8');
}

export { transformWorkshopText, transformModInfo };
