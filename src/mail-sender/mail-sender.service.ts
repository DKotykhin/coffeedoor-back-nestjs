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
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    const msg = {
      to,
      from: `"CoffeeDoor" <${this.config.get('SG_EMAIL_ADDRESS')}>`,
      subject,
      html,
    };

    try {
      return await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}
