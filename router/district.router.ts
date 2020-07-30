import * as express from 'express';
import { Router } from 'express';
import { DistrictController } from '../controllers/district.controller';
import { checkUserAuth } from '../midddlewares/user-check.session';

const newDistrictController = new DistrictController();

const router: Router = express.Router();

/* order Api start from here */

/**
 * /fetch/state/list
 * @author Amritpal Singh
 * @FinalUrlExample /rest/api/fetch/state/list
 * @description this route used for fetching state list
 */
router.get(
    '/rest/api/fetch/district/list/by/state/id',
    checkUserAuth,
    newDistrictController.getDistrictListByStateId);

/**
* /create/state
* @author Amritpal Singh
* @FinalUrlExample /rest/api/create/state
* @description this route used for create state
*/
router.post(
    '/rest/api/create/state',
    checkUserAuth,
    newDistrictController.createDistrict);

/* order Api end here */

export default router;
