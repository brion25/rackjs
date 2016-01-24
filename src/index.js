import {createServer} from "http";
import {createProxyServer} from "http-proxy";

const proxy = createProxyServer({});

class Rack{
  constructor(options){
    let server = createServer((req,res) => {

    });

    console.log(`Server is listening at port : ${options.port || 8000}`);
    server.listen(options.port || 8000);
  }
}

export default Rack;
