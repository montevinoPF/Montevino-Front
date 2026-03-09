import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  reservationDate: Date;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  peopleCount: number;

  @IsNotEmpty()
  @IsString()
  extraTime: string;

  @IsNotEmpty()
  @IsString()
  totalPrice: string;
}
