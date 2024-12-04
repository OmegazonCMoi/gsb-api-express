import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
	auth?: { userId: string };
  }
}
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
  	throw new Error('Authorization header is missing.');
	}

	const token = authHeader.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

	req.auth = { userId: decodedToken.userId };
	next();
  } catch (error) {
	res.status(401).json({ error: 'Unauthorized request' });
  }
};
