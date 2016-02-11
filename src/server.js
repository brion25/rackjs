import {createProxyServer} from 'http-proxy';
import {parse} from 'url';
import {createServer} from 'http';
import {ParentNotFound} from './error-handler/error';

export default Server;

function Server(routes){
  let server = createServer((req,res) => {
    let newUrl = req.url.replace('/',''),
        indexChildPath = newUrl.indexOf('/'),
        parentPath = newUrl.substring(0,indexChildPath);

    if(!routes[parentPath])
      ParentNotFound(parentPath,res);
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

  return server;
}
