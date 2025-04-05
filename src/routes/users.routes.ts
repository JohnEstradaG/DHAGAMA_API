import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { checkJwt } from '../middleware/jwt';

class UsersRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/signin/', usersController.signIn);
        this.router.post('/validateUser/', usersController.validateUser);
        this.router.post('/create', [checkJwt], usersController.create);
        this.router.put('/update/:id', [checkJwt], usersController.update);
        this.router.delete('/delete/:id', [checkJwt], usersController.delete);
        this.router.get('/getOne/ByToken', [checkJwt], usersController.getOneByToken);
        this.router.get('/count/bySearchCompany/:search&:idStatus&:idCompany',[checkJwt], usersController.countBySearchRoleStatus);
        this.router.get('/getAll/byPagebySearchCompany/:index&:size&:search&:idStatus&:idCompany',[checkJwt], usersController.getAllBySearchRoleStatus);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;