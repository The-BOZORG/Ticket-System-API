import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendUserWelcome(
    user: UserEntity,
    verificationToken: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'support team <support@demomailtrap.com>',
      subject: 'welcome to Ticket-System',
      template: './welcome',
      context: {
        name: user.username,
        email: user.email,
        verificationUrl: `http://localhost:3000/auth/verify-email?token=${verificationToken}`,
      },
    });
  }
}
