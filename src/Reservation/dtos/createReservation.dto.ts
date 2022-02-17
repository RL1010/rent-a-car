import { IsDate, IsNotEmpty } from "class-validator";

export class createReservationDto{
   
    @IsNotEmpty({message: "You must provide the start date"})
    @IsDate()
    startDate: Date;

    @IsNotEmpty({message: "You must provide the end date"})
    @IsDate()
    endDate: Date;

  
}