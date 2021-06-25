import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { RepositoryNotTreeError } from "typeorm";

interface IPayload {
  sub: string
}
 function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const decode = verify(token, "bc2e10d13ae766ef65d1686480be542c") as IPayload;
    request.user_id = decode.sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}

export {ensureAuthenticated}