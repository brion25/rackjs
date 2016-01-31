import {createServer} from "http";
import {parse} from "url";
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
        let url = parse(routes[parentPath].url);
        req.url = newUrl.substring(indexChildPath);
        req.headers.host = url.host;
        req.headers.hostname = url.hostname;
        proxy.web(req,res, {
          target : url
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
