import { Expose, Transform } from "class-transformer";


export class ReservationDto{
    @Expose()
    id: number;

    @Expose()
    startDate: Date;

    @Expose()
    endDate: Date;

    @Transform(({obj}) => obj.car.id)
    @Expose()
    carId: number;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;
    

}
