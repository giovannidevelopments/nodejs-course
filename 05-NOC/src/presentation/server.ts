import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new MongoLogDatasource(),
    // new PostgresLogDatasource(),
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)


const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');

        // Send email
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(['jrsjra@gmail.com']);
        // emailService.sendEmailWithFileSystemLogs(
        //     ['giovanniromerotech@gmail.com']
        // );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
    }
}