import { Expose, Transform } from "class-transformer";


export class CarDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    brand: string;

    @Expose()
    year: number;

    @Expose()
    company: string;

    @Expose()
    price: number;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;
    

}
