import * as express from 'express';
import { Router } from 'express';
import { StatesController } from '../controllers/states.controller';
import { checkUserAuth } from '../midddlewares/user-check.session';

const newStateController = new StatesController();

const router: Router = express.Router();

/* order Api start from here */

/**
 * /fetch/state/list
 * @author Amritpal Singh
 * @FinalUrlExample /rest/api/fetch/state/list
 * @description this route used for fetching state list
 */
router.get(
    '/rest/api/fetch/state/list',
    checkUserAuth,
    newStateController.getStateList);

/**
* /create/state
* @author Amritpal Singh
* @FinalUrlExample /rest/api/create/state
* @description this route used for create state
*/
router.post(
    '/rest/api/create/state',
    checkUserAuth,
    newStateController.createState);

/* order Api end here */

export default router;
