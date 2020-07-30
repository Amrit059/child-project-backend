//Define our about us schema
import * as mongoose from 'mongoose'

export interface DistrictDocument extends mongoose.Document {
    id: Number;
    district_name: string;
    state_id: Number;
}

const DistrictSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    state_id: { type: mongoose.Schema.Types.ObjectId },
    district_name: { type: Number }
});

export const DistrictModel: mongoose.Model<DistrictDocument> =
    mongoose.model<DistrictDocument>('districts', DistrictSchema, 'districts');

    export async function districtDetails(name: string, projection: Object): Promise<DistrictDocument> {
        return await DistrictModel.findById({ district_name: name }, projection)
    }