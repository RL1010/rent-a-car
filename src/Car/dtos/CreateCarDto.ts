import { IsString, IsNumber } from "class-validator";


export class CreateCarDto{
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsNumber()
    readonly year: number;

    @IsString()
    readonly company: string;

    @IsNumber()
    readonly price: number;

}