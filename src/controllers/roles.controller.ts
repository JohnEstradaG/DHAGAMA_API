import { Request, Response } from 'express';
import dataBaseService from '../services/data-base.service';
import { Utils } from '../utils';

const utils = new Utils();
class  RolesController{
    
    public async getAll (req: Request, res: Response): Promise<void> {
        const description = 'roles[getAll]';
        dataBaseService.pool?.query('call stp_GC_roles()').then((response) => {
            res.json(utils.response(description, response[0], false));
        }).catch((err) => {
            res.status(403).json(utils.response(description, err, true));
        });
    }

}

const rolesController = new RolesController();
export default rolesController;