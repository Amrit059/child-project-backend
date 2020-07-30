//Define our about us schema
import * as mongoose from 'mongoose'

export interface ChildDocument extends mongoose.Document {
    _id: string;
    name?: string;
    sex?: string;
    father_name?: string;
    mother_name?: string;
    photo?: string;
    district_id?: Number;
    dob?: Date;
}

const ChildSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String },
    sex: { type: String },
    father_name: { type: String },
    mother_name: { type: String },
    photo: { type: String },
    district_id: { type: Number },
    dob: { type: Date },
});

export const ChildModel: mongoose.Model<ChildDocument> =
    mongoose.model<ChildDocument>('childs', ChildSchema, 'childs');

