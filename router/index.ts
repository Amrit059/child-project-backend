import * as express from 'express';
import { Router } from 'express';
import UserRoutes from './users.router';
import StatesRoutes from './states.router';
import DistricRoutes from './district.router';

const router: Router = express.Router();

const routePagePath = [].concat(
    UserRoutes,
    StatesRoutes,
    DistricRoutes
);

/* Rest Api with version*/

router.use(routePagePath);

export default router;
