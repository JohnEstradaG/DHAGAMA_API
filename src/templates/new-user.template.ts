export class NewUserTemplate {
    static getTemplate( siteLink: String, email: string, token: string) {
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
                        <p style="text-align: justify; font-size: 16px;">Le damos la más cordial bienvenida a nuestra plataforma.</p>
                        <p style="text-align: justify; font-size: 16px;">A continuación, le proporcionamos la información necesaria para comenzar a utilizar nuestros servicios:</p>
                        <p style="text-align: justify; font-size: 16px;">Usuario: <strong>${email}</strong></p>
                        <p style="text-align: justify; font-size: 16px;">Para verificar su contraseña y completar el proceso de configuración, por favor ingrese al siguiente enlace:</p>
                        <a style="text-align: center; font-size: 14px;"href="${siteLink}establecer/${token}"><strong>Verificar Contraseña</strong></a></p>
                        <p style="font-size: 16px;">Tenga un excelente día.</p>
                    </div>
                
                    <hr style="width:100%;">
                </section>
                <footer style="font-size: 12px; text-align: end; color: #6A7070;">
                    Todos los derechos reservados &#169;ODM.
                </footer>
            </div>
        </body>
        `;
    }
}