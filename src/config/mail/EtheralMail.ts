import nodemailer from "nodemailer";
import { ISendMail } from "src/interfaces";
import { handlebarsMailTemplate } from "./HandlebarsMailTemplate";

export class EtheralMail {
    static async sendMail({ from, to, subject, templateData }: ISendMail): Promise<void> {
        const mainTemplate = new handlebarsMailTemplate();

        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || "Equipe Vendas",
                address: from?.email || "equipe@apivendas.com.br",
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mainTemplate.parse(templateData),
        })

        console.log("Message sent: %s", message.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }

}