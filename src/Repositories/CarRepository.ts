import { NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "src/Car/dtos/CreateCarDto";
import { UpdateCarDto } from "src/Car/dtos/UpdateCarDto";
import { Car } from "src/Entities/CarEntity";
import { User } from "src/Entities/UserEntity";
import { CarRepositoryInterface } from "src/Interfaces/RepositoryInterface/CarRepositoryInterface";
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