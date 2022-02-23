import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/getUser.decorator';
import { User } from 'src/Entities/user.entity';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { carService, CarServiceInterface } from 'src/Interfaces/ServiceInterface/carService.interface';
import { Car } from '../Entities/car.entity';
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/createCar.dto';
import { FilterCarDto } from './dtos/filterCar.dto';
import { UpdateCarDto } from './dtos/updateCar.dto';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarController {
constructor(@Inject(carService) private carService: CarServiceInterface){}

    @Post('create')
    @Serialize(CarDto)
    createCar(@Body(ValidationPipe) body: CreateCarDto,
              @GetUser() user: User ) : Promise<Car>{
        return this.carService.createCar(body, user)
    }

    @Get('/:id')
    findOneCar(@Param('id') id: number,
            @GetUser() user: User): Promise<Car>{
        return this.carService.findOneCar(id, user)
    }

    @Get()
    getAllCars(@Query() filterDto: FilterCarDto,
               @GetUser() user: User): Promise<Car[]>{
        return this.carService.getAllCars(filterDto, user)
    }

    @Patch('/:id')
    updateCar(@Param('id') id: string, 
              @Body(ValidationPipe) updateCarDto: UpdateCarDto,
              @GetUser() user: User): Promise<Car>{
        return this.carService.updateCar(parseInt(id), updateCarDto, user)
    }

    @Delete('/:id')
    removeCar(@Param('id') id: string,
              @GetUser() user: User): Promise<void>{
        return this.carService.removeCar(parseInt(id), user)

    }
}

