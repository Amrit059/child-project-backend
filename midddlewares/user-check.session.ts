import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SERVER } from '../configuration/environment';


export const checkUserAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.headers is', req.headers.token);
    const token: string = String(req.headers.token);
    if (token) {
        const tokenValue = token;
        try {
            const userInfo: any = await jwt.verify(tokenValue, SERVER.JWT_PUBLIC_KEY);
            console.log('userInfo is ', userInfo);
            if (userInfo.login_id != undefined || userInfo.login_id != null) {
                req.app.locals['userId'] = userInfo.userId; /* for creating global variable for all project */
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    statusCode: 499,
                    message: 'token expire'
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                success: false,
                statusCode: 499,
                message: 'unauthrized user',
                extendedMessage: err.message
            })
        }
    } else {
        return res.status(401).json({
            success: false,
            statusCode: 499,
            message: 'unauthrized user',
        })
    }
}





