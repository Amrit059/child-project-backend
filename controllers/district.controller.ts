import { Request, Response, NextFunction } from 'express';
import { DistrictDocument, DistrictModel, districtDetails } from '../models/district.model';

export class DistrictController {

    constructor() {
        console.log('District Controller called');
    }

    async getDistrictListByStateId(req: Request, res: Response, next: NextFunction) {
        const state_id: Number = Number(req.query.state_id)
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(req.query.limit) ? Number(req.query.limit) : 30;
        try {
            const districtModel: DistrictDocument[] = await DistrictModel.find({ state_id: Number(state_id) })
                .skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "District Detail",
                "timestamp": new Date().getTime(),
                "district": districtModel
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createDistrict(req: Request, res: Response, next: NextFunction) {
        try {
            let districtModel: DistrictDocument = req.body;
            let newStateModel: DistrictDocument = await districtDetails(districtModel.district_name, {});
            if (newStateModel) {
                res.status(200).send({
                    "success": false,
                    "status": 200,
                    "message": "Got error while saving",
                    "ERROR": {
                        "district_name": [
                            "This District is already exist"
                        ]
                    }
                });
            } else {
                districtModel = new DistrictModel(districtModel);
                districtModel = await districtModel.save()
                res.status(200).send({
                    "success": true,
                    "status": 200,
                    "message": "District Detail",
                    "timestamp": new Date().getTime(),
                    "district": districtModel
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}