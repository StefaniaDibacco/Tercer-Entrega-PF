import { Request, Response, NextFunction } from 'express';

const user = true;

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('EJECUTANDO MIDDLEWARE');
  if (user) next();
  else {
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  }
};
