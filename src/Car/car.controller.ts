import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/GetUserDecorator';
import { User } from 'src/Entities/UserEntity';
import { carService, CarServiceInterface } from 'src/Interfaces/ServiceInterface/CarServiceInterface';
import { Car } from '../Entities/CarEntity';
import { CarService } from './car.service';
import { CreateCarDto } from './dtos/CreateCarDto';
import { UpdateCarDto } from './dtos/UpdateCarDto';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarController {
constructor(@Inject(carService) private carService: CarServiceInterface){}

    @Post('create')
    createCar(@Body() body: CreateCarDto,
              @GetUser() user: User ) : Promise<Car>{
        return this.carService.createCar(body, user)
    }

    @Get('/:id')
    findUser(@Param('id') id: number,
            @GetUser() user: User): Promise<Car>{
        return this.carService.findOneCar(id, user)
    }

    @Get()
    find(@Body() attr: Partial<Car>,
         @GetUser() user: User): Promise<Car[]>{
        return this.carService.find(attr, user)
    }

    @Patch('/:id')
    updateCar(@Param('id') id: string, 
              @Body() updateCarDto: UpdateCarDto,
              @GetUser() user: User): Promise<Car>{
        return this.carService.updateCar(parseInt(id), updateCarDto, user)
    }

    @Delete('/:id')
    removeCar(@Param('id') id: string,
              @GetUser() user: User): Promise<Car>{
        return this.carService.removeCar(parseInt(id), user)

    }
}

