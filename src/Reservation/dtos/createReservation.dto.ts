import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class createReservationDto{
   
    @IsNotEmpty({message: "You must provide the start date"})
    @IsDateString()
    startDate: Date;

    @IsNotEmpty({message: "You must provide the end date"})
    @IsDateString()
    endDate: Date;

  
}