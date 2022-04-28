const { parse } = require('./parse.js');

module.exports = class PZLuaProcessor {
  constructor(config = {}) {
    this.config = config;
    this.extensions = this.config.extensions ? this.config.extensions : [];
  }

  availableExtensions() {
    return ['.lua'].concat(this.extensions);
  }

  processor(ext) {
    return {
      preProcess(text, filePath) {
        return parse(text);
      },
      postProcess(messages, filePath) {
        return {
          messages,
          filePath: filePath ? filePath : '<pzlua>',
        };
      },
    };
  }
};
