import { Injectable } from '@nestjs/common';

@Injectable()
export class WhiteListProvider {
  private readonly adminEmails = ['admin@example.com', 'soroush@yahoo.com'];

  public isAdmin(email: string): boolean {
    return this.adminEmails.includes(email);
  }
}
