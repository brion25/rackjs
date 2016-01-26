import {createServer} from "http";
import {createProxyServer} from "http-proxy";

const proxy = createProxyServer({});

var self = null;

class Rack{
  constructor(options){
    self = this;

    let server = createServer((req,res) => {

    });

    console.log(`Server is listening at port : ${options.port || 8000}`);
    server.listen(options.port || 8000);
  }
  route(route,params){
    console.log(self.route);
  }
}

export default Rack;
