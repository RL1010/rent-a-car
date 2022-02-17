import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateCarDto{
    @IsString()
    @IsOptional()
     name: string;

    @IsString()
    @IsOptional()
    readonly brand: string;

    @IsNumber()
    @IsOptional()
    readonly year: number;

    @IsString()
    @IsOptional()
    readonly company: string;

    @IsNumber()
    @IsOptional()
    readonly price: number;
}