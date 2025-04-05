export class ForgotPasswordTemplate {
    static getTemplate(data: any, link: string) {
        const template = `
        <body style=" background-color: rgb(235, 233, 233); padding: 1rem; font-family: 'Montserrat', sans-serif;">
        <div style="background-color: white; position: relative; box-shadow:2px 2px 30px grey;
        -webkit-box-shadow: 2px 2px 30px grey;
        -moz-box-shadow:2px 2px 30px grey;
        -ms-box-shadow:2px 2px 30px grey; padding: 3rem;">
            <section>
                <div style="padding-bottom: 2rem;">
                    <p style="font-size: 16px;">Estimado/a ${data.name} ${data.first_name} ${data.last_name}.</p>
                </div>
                <div style="padding-bottom: 2rem;">
                    <p style="font-size: 28px; font-weight: 800;">¡Olvido su contraseña!</p>
                    <p style="text-align: justify; font-size: 16px;">Ha solicitado el restablecimiento de su contraseña, si fue así visita este link <a href='${link}'><strong>Restablecimiento de contraseña</strong></a> para restablecer, de no ser así puede omitir este correo</p>
                </div>
                <p style="font-size: 16px;">Tenga un excelente día.</p>
                <hr style="width:100%;">
            </section>
        </div>
    </body>
        `;
        return template;
    }
}