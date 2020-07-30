import * as jwt from 'jsonwebtoken';
import { UserDocument } from './models/user.model';

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MDk0NTU2MDB9.-t7115wj9d4jKMByIqJOHPbHvYPHQBRVsFwWA56_GpE";

export class UtillServices {


    constructor() {
        console.log('Utill Services called')
    }

    /**
     * @author Amritpal Singh
     * @param { Any } data 
     * @description this method used for encryption base 64
     */
    encodeBase64(data: any): any {
        console.log('inside UtillServices encoded', data);
        const response = Buffer.from(data).toString('base64');
        return response;
    }

    /**
     * @author Amritpal Singh
     * @param { String } token 
     * @description this method used for encryption base 64
     */
    decodeBase64(token: string): any {
        console.log('inside UtillServices decoded', token);
        const response = Buffer.from(token, 'base64').toString('ascii')
        return response;
    }

    createJsonWebToken(userModel: UserDocument): string {
        const token = jwt.sign(userModel, PUBLIC_KEY);
        return token;
    }

}