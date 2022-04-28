const contentTypeData = {
  WORKSHOP_TEXT: 'workshopText',
  MOD_INFO: 'modInfo',
  GENERAL_LUA: 'generalLua',
  TOWN_DESCRIPTION_LUA: 'townDescriptionLua',
  RADIO_LUA: 'radioLua',
  OTHERS: 'others',
};

const detectionData = [
  {
    regexp: /workshop\.txt$/i,
    name: contentTypeData.WORKSHOP_TEXT,
  },
  {
    regexp: /mod\.info$/i,
    name: contentTypeData.MOD_INFO,
  },
  {
    regexp: /\.general\.lua$/i,
    name: contentTypeData.GENERAL_LUA,
  },
  {
    regexp: /\.towndesc\.lua$/i,
    name: contentTypeData.TOWN_DESCRIPTION_LUA,
  },
  {
    regexp: /\.radio\.lua$/i,
    name: contentTypeData.RADIO_LUA,
  },
];

function detectFileContentType(srcFilePath) {
  const result = detectionData.find(({ regexp }) => {
    return regexp.test(srcFilePath);
  });
  return result ? result.name : contentTypeData.OTHERS;
}

export { contentTypeData, detectFileContentType };
