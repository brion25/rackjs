import ErrorMessages from "./error-messages";

export function ParentNotFound(route,res){
  log.error(`Route : '${route}' is not declared...`)
  res.writeHead(404, {"Content-Type": "application/json"});
  res.write(ErrorMessages.PARENT_NOT_FOUND);
  res.end();
}
