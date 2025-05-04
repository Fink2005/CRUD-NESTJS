/* eslint-disable @typescript-eslint/only-throw-error */

import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});
// Kiem tra xem thu co file .env hay chua

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('khong tim thay file .env');
  process.exit(1);
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string;
  @IsString()
  ACCESS_TOKEN_SECRET!: string;
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string;
  @IsString()
  REFRESH_TOKEN_SECRET: string;
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string;
}

const configServer = plainToInstance(ConfigSchema, process.env);
// console.log('configServer', configServer);
const e = validateSync(configServer);
if (e.length > 0) {
  const errors = e.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    };
  });
  throw errors;
}

const envConfig = configServer;

export default envConfig;
