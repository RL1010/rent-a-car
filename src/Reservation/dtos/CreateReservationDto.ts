import { IsDate } from "class-validator";

export class createReservationDto{
   
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

  
}