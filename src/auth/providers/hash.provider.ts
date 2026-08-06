import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashProvider {
  private readonly saltRound = 10;

  public async hash(data: string): Promise<string> {
    return await bcrypt.hash(data.this.saltRound);
  }

  public async compare(
    plainText: string,
    hashedText: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }
}
