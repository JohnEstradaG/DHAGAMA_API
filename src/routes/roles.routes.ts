import { Router } from 'express';
import { checkJwt } from '../middleware/jwt'
import rolesController from '../controllers/roles.controller';

class RolesRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll',[checkJwt],  rolesController.getAll);
       
    }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;