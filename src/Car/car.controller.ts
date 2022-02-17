import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/getUser.decorator';
import { User } from 'src/Entities/user.entity';
import { carService, CarServiceInterface } from 'src/Interfaces/ServiceInterface/carService.interface';
import { Car } from '../Entities/car.entity';
import { CreateCarDto } from './dtos/createCar.dto';
import { UpdateCarDto } from './dtos/updateCar.dto';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarController {
constructor(@Inject(carService) private carService: CarServiceInterface){}

    @Post('create')
    createCar(@Body(ValidationPipe) body: CreateCarDto,
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
              @Body(ValidationPipe) updateCarDto: UpdateCarDto,
              @GetUser() user: User): Promise<Car>{
        return this.carService.updateCar(parseInt(id), updateCarDto, user)
    }

    @Delete('/:id')
    removeCar(@Param('id') id: string,
              @GetUser() user: User): Promise<Car>{
        return this.carService.removeCar(parseInt(id), user)

    }
}

