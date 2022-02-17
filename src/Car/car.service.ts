import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { carRepository, CarRepositoryInterface } from 'src/Interfaces/RepositoryInterface/carRepository.interface';
import { CarRespository } from 'src/Repositories/CarRepository';
import { Repository } from 'typeorm';
import { Car } from '../Entities/car.entity';
import { CreateCarDto } from './dtos/createCar.dto';
import { UpdateCarDto } from './dtos/updateCar.dto';

@Injectable()
export class CarService {
    constructor(@Inject(carRepository) private carRepository: CarRepositoryInterface){}

    async createCar(createCarDto: CreateCarDto, user: User) : Promise<Car>{
        return await this.carRepository.createCar(createCarDto, user)
    }

    async findOneCar(id: number, user: User): Promise<Car>{
        return await this.carRepository.findOneCar(id, user)
    }
    // Duhet mi rrregullu
    async find(attrs: Partial<Car>, user: User): Promise<Car[]>{
        return await this.carRepository.find(attrs, user)
    }

    async updateCar(id: number, updateCarDto: UpdateCarDto, user: User): Promise<Car>{
        return await this.carRepository.updateCar(id, updateCarDto, user)
    }

    async removeCar(id: number, user: User): Promise<Car>{
        return await this.carRepository.removeCar(id, user)
    }
}
