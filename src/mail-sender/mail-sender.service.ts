import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailSenderService {
  constructor(private readonly config: ConfigService) {
    sgMail.setApiKey(this.config.get('SG_API_KEY'));
  }
  async sendMail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const msg = {
      to,
      from: `"CoffeeDoor" <${this.config.get('SG_EMAIL_ADDRESS')}>`,
      subject,
      text,
    };

    try {
      return await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}
