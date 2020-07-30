import { Request, Response, NextFunction } from 'express';
// import { UserModel, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
// import { UtillServices } from '../utill.service';
import { StateDocument, StateModel, stateDetails } from '../models/states.model';


// const utillServices: UtillServices = new UtillServices();

export class StatesController {
    constructor() {
        console.log('States Controller called');
    }

    async getStateList(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(req.query.limit) ? Number(req.query.limit) : 30;
        try {
            const stateModel: StateDocument[] = await StateModel.find({})
                .skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "State Detail",
                "timestamp": new Date().getTime(),
                "state": stateModel
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createState(req: Request, res: Response, next: NextFunction) {
        try {
            let stateModel: StateDocument = req.body;
            let newStateModel: StateDocument = await stateDetails(stateModel.state_name, {});
            if (newStateModel) {
                res.status(200).send({
                    "success": false,
                    "status": 200,
                    "message": "Got error while saving",
                    "ERROR": {
                        "state_name": [
                            "This State is already exist"
                        ]
                    }
                });
            } else {
                stateModel = new StateModel(stateModel);
                stateModel = await stateModel.save()
                res.status(200).send({
                    "success": true,
                    "status": 200,
                    "message": "State Detail",
                    "timestamp": new Date().getTime(),
                    "state": stateModel
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}