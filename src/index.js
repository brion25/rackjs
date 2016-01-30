import {createServer} from "http";
import {createProxyServer} from "http-proxy";
import {ParentNotFound} from "./error";

const proxy = createProxyServer({});

var self = null,
    routes = {};

class Rack{
  constructor(options){
    self = this;

    let server = createServer((req,res) => {
      let newUrl = req.url.replace('/',''),
          indexChildPath = newUrl.indexOf('/'),
          parentPath = newUrl.substring(0,indexChildPath);

      if(!routes[parentPath])
        ParentNotFound(res);
      else{
        req.url = newUrl.substring(indexChildPath);
        proxy.web(req,res, {
          target : routes[parentPath].url
        });
      }
    });

    console.log(`Server is listening at port : ${options.port || 8000}`);
    server.listen(options.port || 8000);
  }
  route(route,params){
    routes[route] = params;
    return self;
  }
}

module.exports = Rack;
