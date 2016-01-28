import ErrorMessages from "./error-messages";

export function ParentNotFound(res){
  res.writeHead(404, {"Content-Type": "application/json"});
  res.write(ErrorMessages.PARENT_NOT_FOUND);
  res.end();
}
