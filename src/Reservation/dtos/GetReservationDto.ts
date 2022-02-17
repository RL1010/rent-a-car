import { IsDate, IsNumber } from "class-validator";

export class getReservationsDto{
    @IsDate()
    startDate: string;

    @IsDate()
    endDate: Date;

    @IsNumber()
    carId: number;
    
    @IsNumber()
    userId: number;
}