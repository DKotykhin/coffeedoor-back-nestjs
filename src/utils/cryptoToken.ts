import crypto from 'crypto';

import { HttpStatus, HttpException } from '@nestjs/common';

export const cryptoToken = () => {
  const buffer = crypto.randomBytes(16);
  if (!buffer)
    throw new HttpException('Token error', HttpStatus.INTERNAL_SERVER_ERROR);
  const token = buffer.toString('hex');
  return token;
};
