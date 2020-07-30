import * as express from 'express';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { checkUserAuth } from '../midddlewares/user-check.session';

const newUserController = new UserController();

const router: Router = express.Router();

/* user Api start from here */

/**
* /login/user
* @author Amritpal Singh
* @FinalUrlExample /rest/api/login/user
* @description this route used for login user
*/
router.post(
    '/rest/api/login/user',
    newUserController.loginUser);

/**
* /fetch/user/logout
* @author Amritpal Singh
* @FinalUrlExample /rest/api/fetch/user/logout
* @description this route used for user logout
*/
router.get(
    '/rest/api/fetch/user/logout',
    checkUserAuth,
    newUserController.userLogout);


/* user Api end here */

export default router;
