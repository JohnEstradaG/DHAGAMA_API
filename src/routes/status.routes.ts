import { Router } from 'express';
import { checkJwt } from '../middleware/jwt'
import statusController from '../controllers/status.controller';

class StatusRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getAll', [checkJwt], statusController.getAll);
    }
}

const statusRoutes = new StatusRoutes();
export default statusRoutes.router;