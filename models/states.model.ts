//Define our about us schema
import * as mongoose from 'mongoose'

export interface StateDocument extends mongoose.Document {
    id: Number;
    state_name: string;
}

const StateSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    state_name: { type: String }
});

export const StateModel: mongoose.Model<StateDocument> =
    mongoose.model<StateDocument>('states', StateSchema, 'states');

export async function stateDetails(name: string, projection: Object): Promise<StateDocument> {
    return await StateModel.findById({ state_name: name }, projection)
}