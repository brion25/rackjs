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
      let parentPath = req.url.split('/')[1];
      if(!routes[parentPath]) ParentNotFound(res);
    });

    console.log(`Server is listening at port : ${options.port || 8000}`);
    server.listen(options.port || 8000);
  }
  route(route,params){
    routes[route];
    return self;
  }
}

export default Rack;
