import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import dataBaseService from '../services/data-base.service';
import dictionaryUtils from '../dictionary.utils';
import { EmailService } from '../services/email.service';
import { Utils } from '../utils';

const utils = new Utils();
class UsersController {

    public async signIn(req: Request, res: Response): Promise<void> {
        const description = 'User[signIn]';
        const { email, password } = req.body;
        dataBaseService.pool?.query('CALL stp_sign_in(?, ?)', [email, password]).then((user) => {
            if (user[0].length > 0) {
                const token = jwt.sign({ userId: user[0][0].id, email: user[0][0].email, version: dictionaryUtils.version }, config.jwt)
                res.json(utils.response(description, { token, currentUser: user[0][0] }, false));
            } else {
                res.status(403).json(utils.response(description, 'Datos Incorrectos', true));
            }
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true));
        });
    }

    public async validateUser(req: Request, res: Response): Promise<void> {
        const description = 'User[validateUser]';
        const { email, password, idBranch } = req.body;
        dataBaseService.pool?.query('CALL stp_validate_user(?, ?, ?)', [email, password, idBranch]).then((user) => {
            if (user[0].length > 0) {
                res.json(utils.response(description, true, false));
            } else {
                res.status(403).json(utils.response(description, 'Datos Incorrectos', true));
            }
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true));
        });
    }

    public async getOneByToken(req: Request, res: Response): Promise<void> {
        const description = 'User[getOneByToken]';
        const auth = req.headers['auth'] as string;
        const jwtPayload = <any>jwt.verify(auth, config.jwt);
        dataBaseService.pool?.query('call stp_PC_user(?)', [jwtPayload.userId]).then((user) => {
            res.json(utils.response(description, user[0][0], false))
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true))
        })
    }

    public async create(req: Request, res: Response): Promise<void> {
        const description = 'Users[create]';
        const forgotPasswordToken = utils.generateToken(30);
        const { email, name, firstName, lastName, phone, licenseNumber, idCompany, idRole, createdBy } = req.body

        dataBaseService.pool?.query('CALL stp_C_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, forgotPasswordToken, name, firstName, lastName, phone, licenseNumber, idCompany, idRole, createdBy])
            .then((users) => {
                if (users[0][0].id_user_data !== undefined) {
                    EmailService.newUser(req.body.email, forgotPasswordToken)
                }
                res.json(utils.response(description, users[0][0], false));
            })
            .catch((error) => {
                res.status(403).json(utils.response(description, error, true));
            });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const description = 'Users[update]'
        const { id } = req.params
        const { name, firstName, lastName, profilePicturePath, idStatus, licenseNumber, idRole, phone } = req.body

        dataBaseService.pool?.query('CALL stp_U_user(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, name, firstName, lastName, profilePicturePath, idStatus, licenseNumber, idRole, phone]).then(() => {
            res.json(utils.response(description, true, false));
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true));
        });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const description = 'Users[delete]';
        const { id } = req.params;
        dataBaseService.pool?.query('call stp_D_user( ? )', [id]).then(async (user) => {
            res.json(utils.response(description, user, false))
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true))
        })
    }

    public async countBySearchRoleStatus(req: Request, res: Response): Promise<void> {
        const description = 'Users[countBySearchRoleStatus]';
        const { search, idCompany, idStatus } = req.params;

        dataBaseService.pool?.query('call  stp_PC_count_users_by_search_company(?, ?, ?)', [search, idCompany, idStatus]).then((users) => {
            res.json(utils.response(description, users[0][0].users, false));
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true));
        });
    }

    public async getAllBySearchRoleStatus(req: Request, res: Response): Promise<void> {
        const description = 'Users[getAllBySearchRoleStatus]';
        const { index, size, search, idCompany, idStatus } = req.params;

        dataBaseService.pool?.query('call stp_GC_users_by_page_by_search_company(?, ?, ?, ?, ?)', [index, size, search, idCompany, idStatus]).then((users) => {
            res.json(utils.response(description, users[0], false));
        }).catch((error) => {
            res.status(403).json(utils.response(description, error, true));
        });
    }
}

const usersController = new UsersController();
export default usersController;
