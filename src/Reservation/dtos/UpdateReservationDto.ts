import { IsDate, IsDateString, IsNumber } from "class-validator";

export class UpdateReservationDto{
   
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsNumber()
    carId: number;
}