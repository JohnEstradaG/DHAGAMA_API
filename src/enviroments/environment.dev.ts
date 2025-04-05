const privateKey = '';
const certificate = '';

export const environment = {
    production: false,
    credentials: {
        key: privateKey,
        cert: certificate
    },
    site: 'http://localhost:4200/#/',
    logo: 'https://storage.googleapis.com/control-de-acceso-dev-storage-mailing/logo.png',
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'dg_db'
    },
    mailCredentials: {
        host: '',
        port: 465,
        auth: {
            user: '',
            pass: ''
        }
    },
};

