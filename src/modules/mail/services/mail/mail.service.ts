import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

import { ENV_VARS } from 'src/constants/env';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    const SMTP_HOST = this.configService.get(ENV_VARS.SMTP_HOST);
    const SMTP_PORT = this.configService.get(ENV_VARS.SMTP_PORT);
    const SMTP_USER = this.configService.get(ENV_VARS.SMTP_USER);
    const SMTP_PASS = this.configService.get(ENV_VARS.SMTP_PASS);

    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  public async sendEmail(from: string, to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
  }
}
