import { createTransport } from 'nodemailer';
import { environment } from '../enviroments/environment';
import dictionaryUtils from '../dictionary.utils';
import { NewUserTemplate } from '../templates/new-user.template';
import { ForgotPasswordTemplate } from '../templates/forgot-password.template';
import { CredentialResetTemplate } from '../templates/credential-reset.template';

export class EmailService {

    private static pendingEmails: { user: string, subject: string, html: string }[] = [];
    
    private static transporter() {
        return createTransport({
            host: environment.mailCredentials.host,
            port: environment.mailCredentials.port,
            secure: true,
            auth: {
                user: environment.mailCredentials.auth.user,
                pass: environment.mailCredentials.auth.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    private static async sendEmail( emailTo: string, subject: string, templeate: string, file ?: any) {        
        new Promise((resolve, reject) => {
            const mailOptions = {
                from: this.fromEmail(),
                to: emailTo,
                subject: subject,
                html: templeate
            }
            const transporter = this.transporter();
            transporter.sendMail(mailOptions,
                (error: any, info: any) => {
                    if (error) {
                        console.log('Error' +  error);
                        reject(error);
                    } else {
                        console.log(dictionaryUtils.messages.sendSuccesfullMail + ' ' + info.response + ' ' + emailTo);
                        resolve(info.response);
                    }
            });
        })
    }

    private static fromEmail() {
        return "CONTROL DE ACCESOS - <" + environment.mailCredentials.auth.user + ">";
    }

    static async newUser(user: string, token: any) {
        const subject = dictionaryUtils.messages.subjectuNewUser;
        const html = NewUserTemplate.getTemplate( environment.site,user, token);
        
        this.pendingEmails.push({ user, subject, html });

        if (this.pendingEmails.length === 1) {
            const interval = setInterval(async () => {
                if (this.pendingEmails.length > 0) {
                    const email = this.pendingEmails.shift();
                    try {
                        await this.sendEmail(email!.user, email!.subject, email!.html);
                    } catch (error) {
                        console.error(`Error al enviar correo a ${email!.user}:`, error);
                    }
                } else {
                    clearInterval(interval);  
                }
            }, 5000);  // Esperar 5 segundos entre cada correo
        }
    }

    static async forgotPassword(userData: any, token: string) {
        const subject = 'Establecer contraseña';
        const html = ForgotPasswordTemplate.getTemplate(userData, (environment.site + 'establecer/' + token));
        return await this.sendEmail(userData.email, subject, html);
    }


    static async credentialReset(user: any) {
        const subject = 'Envio de contraseña';
        const html = CredentialResetTemplate.getTemplate(environment.site, user.email)
        return await this.sendEmail(user.email, subject, html);
    }
    
}