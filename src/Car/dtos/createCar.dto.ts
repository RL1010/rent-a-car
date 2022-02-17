import { IsString, IsNumber, IsNotEmpty, Length } from "class-validator";


export class CreateCarDto{
    @IsString()
    @IsNotEmpty({message: "Name must contain a value"})
    readonly name: string;

    @IsString()
    @IsNotEmpty({message: "Brand must contain a value"})
    readonly brand: string;

    @IsNumber()
    @IsNotEmpty({message: "Year must contain a number"})
    readonly year: number;

    @IsString()
    @IsNotEmpty({message: "You must specify the company's name"})
    readonly company: string;

    @IsNumber()
    @IsNotEmpty({message: "Price is missing"})
    readonly price: number;

}