import { IsDate, IsDateString, IsNumber, IsOptional } from "class-validator";

export class UpdateReservationDto{
   
    @IsOptional()
    @IsDate()
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsNumber()
    carId: number;
}