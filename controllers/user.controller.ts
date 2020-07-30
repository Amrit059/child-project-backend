import { Request, Response, NextFunction } from 'express';
import { UserModel, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
import { UtillServices } from '../utill.service';

const utillServices: UtillServices = new UtillServices();

export class UserController {
    constructor() {
        console.log('User Controller called');
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel = await UserModel.findOne({
                username: userModel.username
            }).exec()
            if (utillServices.decodeBase64(userModel.password) === utillServices.decodeBase64(userModel.password)) {
                res.status(200).send({
                    "success": true,
                    "status": 200,
                    "message": "Login successfull.",
                    "token": utillServices.createJsonWebToken(userModel),
                    "login_id": userModel.login_id,
                    "last_login": new Date().getTime(),
                    "timestamp": new Date().getTime(),
                });
            } else {
                res.status(404).send({ message: 'invalid credential!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async userLogout(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: Number = req.app.locals.userId
            const userModel: UserDocument = await UserModel.updateOne({ id: userId }, { $set: { login_id: null } })
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "Successfully logged out"
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}