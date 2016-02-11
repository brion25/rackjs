import {log} from 'log-util';
import Server from './server';

global.log = log;

const proxy = createProxyServer({});

var self = null,
    routes = {};

class Rack{
  constructor(options){
    self = this;
    self.options = options || {}
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
      server.listen(options.port || 8000, function(){
        log.info(`Server is listening at port : ${options.port || 8000}`);
      });
    }
  }
}

module.exports = Rack;
