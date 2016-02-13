import {argv} from 'yargs';
import Server from './server';


var self = null,
    routes = {};

class Rack{
  constructor(options){
    self = this;
    self.options = options || {}
    if(!argv.log && argv.log !== undefined){
      log.verbose(`Logging has been muted`);
      log.verbose = function(){};
      log.error = function(){};
      log.info = function(){};
      log.warn = function(){};
      log.debug = function(){};
      global.log = log;
    }
  }
  route(route,params){
    routes[route] = params;
    log.verbose(`Route with name : '${route}' has been set`);
    return self;
  }
  start(cb){
    const server = Server(routes);
    if(cb){
      server.listen(self.options || 8000,cb);
    }else{
      server.listen(self.options.port || 8000, function(){
        log.verbose(`Server is listening at port : ${self.options.port || 8000}`);
      });
    }
  }
}

module.exports = Rack;
