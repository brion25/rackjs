import {
  which
} from 'shelljs';

import {
  spawn
} from 'child_process';

import {
  join
} from 'path';

const serverStrategies = {
  node : (command,file) => {
    let server = spawn(command,[file]);

    server.stdout.on('data',(data) => {
      log.verbose(data);
    });

    server.stderr.on('data',(err) => {
      log.error(err);
    });
  }
}

class TransformParams{
  constructor(params){
    this.params = params;
    this.commands = {};
    this.verifyCommands();
  }

  typeOfServer(){
    let serverType = {};

    if(this.params.url) serverType.url = true;
    if(this.params.file) serverType.file = true;

    return serverType;
  }

  verifyCommands(){
    if(which('node')) this.commands.node = which('node');
    else{
      log.warn('NodeJS is not present, it could lead in errors');
    }
    if(which('php')) this.commands.php = which('php');
    else{
      log.warn('PHP is not present, it could lead in errors');
    }
  }

  getParams(){
    let serverType = this.typeOfServer(),
        newParams = {};

    if(serverType.file){
      let command = this.commands[this.params.file.type],
          fileSrc = join(process.cwd(),this.params.file.src);

      if(!command){
        log.error(`The server type: '${this.params.file.type}' is not supported.`)
        process.exit(1);
      }

      this.startServer(this.params.file.type,command,fileSrc);
      console.log(fileSrc);
    }else if(serverType.url){
      newParams = this.params;
    }

    return newParams;
  }

  startServer(type,command,file){
    serverStrategies[type](command,file);
  }
}

export default TransformParams;
