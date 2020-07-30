//Define our about us schema
import * as mongoose from 'mongoose'
import { USER_ROLES } from '../configuration/app.constant';

export interface UserDocument extends mongoose.Document {
    id: string;
    unique_user_id?: Number;
    name?: string;
    username?: Number;
    mobile?: Number;
    level_id?: Number;
    password_reset_token?: string;
    email?: string;
    auth_key?: string;
    status?: Number;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
    changed_password_once?: string;
    user_error_frequency_1?: string;
    user_error_frequency_2?: Number;
    user_level?: string;
    login_id?: Number;
}

const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    unique_user_id: { type: Number },
    name: { type: String },
    username: { type: Number },
    mobile: { type: Number },
    level_id: { type: Number },
    password: { type: String },
    password_reset_token: { type: String },
    email: { type: String },
    auth_key: { type: String },
    status: { type: Number },
    created_at: { type: String },
    updated_at: { type: String },
    changed_password_once: { type: String },
    user_error_frequency_1: { type: String },
    user_error_frequency_2: { type: Number },
    user_level: { type: String },
    login_id: { type: Number },
});

export const UserModel: mongoose.Model<UserDocument> =
    mongoose.model<UserDocument>('users', UserSchema, 'users');

export async function userDetails(id: string, projection: Object): Promise<UserDocument> {
    return await UserModel.findById({ _id: mongoose.Types.ObjectId(id) }, projection)
}
