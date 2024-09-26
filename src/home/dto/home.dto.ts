// src/home/dto/home.dto.ts
import { IsString, IsObject } from 'class-validator';

export class HomeDto {
  @IsString()
  token: string;

  @IsObject()
  user: {
    cn: string;
    title: string;
    physicalDeliveryOfficeName: string;
    department: string;
    mail: string;
    description: string;
  };
}
