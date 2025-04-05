import { Request, Response, NextFunction } from 'express'
import config from '../config/config';
import dictionaryUtils from '../dictionary.utils';

import jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction): any => {
    const token = <string>req.headers.auth;
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.jwt);
        res.locals.jwtPayload = jwtPayload;
        if (jwtPayload.ext === true) {
            next();
        } else if (jwtPayload.version !== dictionaryUtils.version || jwtPayload.userId === '' || jwtPayload.apikey === '') {
            return res.status(409).json({ message: 'Unauthorized Credentials' });
        } else {
            next();
        }
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}