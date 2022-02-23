import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/Entities/user.entity';
import { carRepository, CarRepositoryInterface } from 'src/Interfaces/RepositoryInterface/carRepository.interface';
import { Car } from '../Entities/car.entity';
import { CreateCarDto } from './dtos/createCar.dto';
import { FilterCarDto } from './dtos/filterCar.dto';
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

    async getAllCars(filterDto: FilterCarDto, user: User): Promise<Car[]>{
        return await this.carRepository.getAllCars(filterDto, user)
    }

    async getCarswithFilters(filterDto: FilterCarDto, user: User): Promise<Car[]>{
        return await this.carRepository.getAllCars(filterDto, user)
    }
    
    async updateCar(id: number, updateCarDto: UpdateCarDto, user: User): Promise<Car>{
        return await this.carRepository.updateCar(id, updateCarDto, user)
    }

    async removeCar(id: number, user: User): Promise<void>{
        return await this.carRepository.removeCar(id, user)
    }
}
