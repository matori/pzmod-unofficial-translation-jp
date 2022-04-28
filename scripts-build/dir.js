import os from 'os';
import info from './info.js';

const userDir = os.homedir();

const src = './src';
const dest = `${userDir}/Zomboid/Workshop/${info.modInfo.id}`;

export { src, dest };
