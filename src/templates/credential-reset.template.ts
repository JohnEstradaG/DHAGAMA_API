export class CredentialResetTemplate {
    static getTemplate(siteLink: String, email: string) {
        return `
        <body style=" background-color: rgb(235, 233, 233); padding: 1rem; font-family: 'Montserrat', sans-serif;">
        <div style="background-color: white; box-shadow: 2px 2px 30px grey; position: relative; padding: 3rem;">
            <style scoped>
                * {
                    box-sizing: border-box;
                }
    
                .column {
                    float: left;
                    padding: 10px;
                    text-align: center;
                }
    
                .left,
                .right {
                    width: 25%;
                }
    
                .middle {
                    width: 50%;
                }
    
                .row:after {
                    content: "";
                    display: table;
                    clear: both;
                }
    
                @media (max-width: 768px) {
                    .welcome-image {
                        width: 100%;
                    }
                }
    
                @media (min-width: 768px) {
                    .welcome-image {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: 60%;
                    }
                }
            </style>
            <section>
                <div>
                    <p style="font-size: 28px; font-weight: 800;">Estimado/a Usuario/a,</p>
                    <p style="text-align: justify; font-size: 16px;">Le informamos que se han creado las credenciales de
                        acceso al sistema <a style="text-align: center; font-size: 14px;"
                            href="${siteLink}"><strong>CONTROL DE ACCESO</strong></a></p>
                    <p style="text-align: justify; font-size: 16px;">Si usted no ha realizado esta acción, le solicitamos que se ponga en contacto de inmediato con su administrador para garantizar la seguridad de su cuenta.</p>
                    <p style="text-align: justify; font-size: 16px;">Agradecemos su atención y colaboración.</p>
                    <p style="text-align: justify; font-size: 16px;"> Tenga un excelente día.</p>
                </div>
            </section>
        </div>
    </body>
        `;
    }
}