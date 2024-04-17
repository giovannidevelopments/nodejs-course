import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
const nodemailer = require("nodemailer");

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments: Attachment[]; // Corregido el nombre de Attachement a Attachment
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() { }

    async sendMail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments // Corregido el nombre de la propiedad
            });
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',

            })
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            })
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Server Logs Report - ' + new Date().toLocaleDateString();
        const htmlBody = `
        <h2>Server Logs Report</h2>
        <p>Hello!</p>
        <p>Attached you will find the server logs report for ${new Date().toLocaleDateString()}.</p>
        <p>Please review the attached files for more details.</p>
        <p>Best regards,</p>
        <p>Your server</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendMail({ to, subject, attachments, htmlBody });
    }
}
