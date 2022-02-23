import { NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "src/Car/dtos/createCar.dto";
import { FilterCarDto } from "src/Car/dtos/filterCar.dto";
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

    async getAllCars(filterDto: FilterCarDto, user: User): Promise<Car[]>{
        const { name, search } = filterDto;
        const query = this.createQueryBuilder('car');
    
        query.where('car.userId = :userId', { userId: user.id });
        if (name) {
          query.andWhere('car.name = :name', { name });
        }
        if (search) {
          query.andWhere('(car.name LIKE :search OR car.brand LIKE :search OR car.company LIKE :search)', { search: `%${search}%` });
        }
        const cars = await query.getMany();
        return cars;
    }
  
    async updateCar(id: number, updateCarDto: UpdateCarDto, user: User): Promise<Car>{
        const car = await this.findOneCar(id, user)
        Object.assign(car, updateCarDto)
        return this.repository.save(car)
      }
      
    async removeCar(id: number, user: User): Promise<void>{
        const car = await this.findOneCar(id, user)
        await this.repository.remove(car)
    }


}