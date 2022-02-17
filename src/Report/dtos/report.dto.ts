import { Expose, Transform } from "class-transformer";


export class ReportDto{
    @Expose()
    id: number;
    @Transform(({obj}) => obj.reservation.price)
    @Expose()
    totalForMonth: number;
    
    @Transform(({obj}) => obj.car.id)
    @Expose()
    carId: number;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;
    

}
