import { NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "src/Car/dtos/createCar.dto";
import { UpdateCarDto } from "src/Car/dtos/updateCar.dto";
import { Car } from "src/Entities/car.entity";
import { User } from "src/Entities/user.entity";
import { CarRepositoryInterface } from "src/Interfaces/RepositoryInterface/carRepository.interface";
import { AbstractRepository, EntityRepository } from "typeorm";

@EntityRepository(Car)
export class CarRespository extends AbstractRepository<Car> implements CarRepositoryInterface{

    async createCar(createCarDto: CreateCarDto, user: User) : Promise<Car> {
        const car = this.repository.create(createCarDto)
        car.user = user
        return await car.save()
    }

    async findOneCar(id: number, user: User): Promise<Car>{
        const exist = await this.repository.findOne({where: {id, userId: user.id}})
        if(!exist){
            throw new NotFoundException(`Car with id ${id} not found`)
        }
        return exist
    }

    async find(attrs: Partial<Car>, user: User): Promise<Car[]>{
        const found = await this.repository.find(attrs)
        console.log(found);
        if(!found){
            throw new NotFoundException(`Car not found`)
        }
        return found
    }

    async updateCar(id: number, updateCarDto: UpdateCarDto, user: User): Promise<Car>{
        const car = await this.findOneCar(id, user)
        Object.assign(car, updateCarDto)
        return this.repository.save(car)
      }
      
    async removeCar(id: number, user: User){
        const car = await this.findOneCar(id, user)
        return this.repository.remove(car)
    }


}