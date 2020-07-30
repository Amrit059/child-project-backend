import { Request, Response, NextFunction } from 'express';
// import { UserModel, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
// import { UtillServices } from '../utill.service';
import { StateDocument, StateModel, stateDetails } from '../models/states.model';
import { ChildModel, ChildDocument } from '../models/child.model';


// const utillServices: UtillServices = new UtillServices();

export class ChildController {

    constructor() {
        console.log('Child Controller called');
    }

    async getChildList(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(req.query.limit) ? Number(req.query.limit) : 30;
        try {
            const childModel: ChildDocument[] = await ChildModel.find({})
                .skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "Child Profile Detail",
                "timestamp": 1596038682,
                "child_profile": childModel
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createChild(req: Request, res: Response, next: NextFunction) {
        try {
            let childModel: ChildDocument = req.body;
            childModel = new ChildModel(childModel);
            childModel = await childModel.save()
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "child Detail",
                "timestamp": new Date().getTime(),
                "state": childModel
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}