import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { carRepository, CarRepositoryInterface } from 'src/Interfaces/RepositoryInterface/CarRepositoryInterface';
import { CarRespository } from 'src/Repositories/CarRepository';
import { Repository } from 'typeorm';
import { Car } from '../Entities/CarEntity';
import { CreateCarDto } from './dtos/CreateCarDto';
import { UpdateCarDto } from './dtos/UpdateCarDto';

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






    // constructor(@InjectRepository(Car) private repository : Repository <Car>){}

    // create( createCar: CreateCarDto){
    //     const car = this.repository.create(createCar)
    //     return this.repository.save(car)
    // }

    // findOne(id: number){
    //     return this.repository.findOne(id)
    // }

    // find(attrs: Partial<Car>){
    //     return this.repository.find(attrs)
    // }

    // async update(id: number, attrs: Partial<Car>){
    //     const car = await this.findOne(id)
    //     if(!car){
    //         throw new NotFoundException('Car not found!')
    //     }
    //     Object.assign(car, attrs)
    //     return this.repository.save(car)
    // }

    // async remove(id: number){
    //     const car = await this.findOne(id)
    //     if(!car){
    //         throw new NotFoundException('Car not found!')
    //     }
    //     return this.repository.remove(car)
    // }

}
