import {join} from 'path';

export default class File {
  static readConfig(){
    return require(join(process.cwd(),'./rackfile.js'));
  }
}
