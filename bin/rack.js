#!/usr/bin/env node

var join = require('path').join,
    program = require('commander'),
    argv = require('yargs').argv,
    log = require('log-util'),
    info = require('./../package.json');

var CURRENT_LOCATION = process.cwd(),
    EXISTING_COMMANDS = ['_','config','log','h','v','help','version','$0'];

global.log = log;

if(process.argv.length > 2){
  var commands = Object.keys(argv);
  if(argv._.length>0){
    log.error('Unknown commands');
  }else{
    for(var i = 0; i < commands.length ; i++){
      if(!EXISTING_COMMANDS.some(function(element){ return element === commands[i] })){
        log.error('Unknown command : ' + commands[i]);
        process.exit(1);
      }
    }
  }
  program
    .version(info.version)
    .option('--config','specify the path for your rackfile')
    .option('--no-log','mute logs');

  if(argv.config){
    resolveRackfile(join(CURRENT_LOCATION,(argv.config)));
  }

  program.parse(process.argv);
}else{
  resolveRackfile(join(CURRENT_LOCATION,'./rackfile.js'));
}

function resolveRackfile(path){
  if(path.indexOf('rackfile.js') < 0){
    path = join(path,'./rackfile.js');
  }
  try{
    require(path);
  }catch(err){
    if(err.code === 'MODULE_NOT_FOUND') log.error("'rackfile.js' was not found at location : "+path);
    else{
      log.error('Unhandled error...');
      console.log(err.message);
    }
  }
}
