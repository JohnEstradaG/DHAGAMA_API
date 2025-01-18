import { environment } from '../enviroments/environment';
import mysql from 'promise-mysql';

class DataBaseService {
    public pool: mysql.Pool | null = null;

    async createConnections() {
        this.pool = await this.createPoolConnection(environment.database);
    }

    createPoolConnection(environment: any): Promise<mysql.Pool> {
        return new Promise((resolve, reject) => {
            mysql.createPool(environment).then((resPool: any) => {
                resPool.getConnection().then(() => {
                    console.log('Conexion exitosa.');
                })
                resolve(resPool);
            }).catch((error: any) => {
                console.log('Error en la conexion', error);
                reject(error);
            });
        });
    }

    testConnection(host: string, database: string, user: string, password: string, port: number = 3306) {
        return new Promise((resolve) => {
            mysql.createConnection({
                host: host,
                database: database,
                user: user,
                password: password,
                port: port
            }).then((connection: any) => {
                connection.sqlState = "200";
                resolve(connection);
            }).catch((error: any) => {
                error.sqlState = "500"
                resolve(error);
            })
        })
    }

}


const dataBaseService = new DataBaseService();
export default dataBaseService;
