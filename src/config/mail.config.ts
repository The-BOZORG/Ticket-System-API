import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';

export async function mailConfig(
  configService: ConfigService,
): Promise<MailerOptions> {
  return {
    transport: {
      host: configService.getOrThrow<string>('MAIL_HOST'),
      port: 587,
      secure: false,
      auth: {
        user: configService.getOrThrow<string>('SMTP_USERNAME'),
        pass: configService.getOrThrow<string>('SMTP_PASSWORD'),
      },
    },
    defaults: {
      from: 'Ticket-System <no-reply@demomailtrap.com>',
    },
    template: {
      dir: join(__dirname, '..', 'mail', 'template'),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
}
