import { CreateCarDto } from "src/Car/dtos/CreateCarDto";
import { UpdateCarDto } from "src/Car/dtos/UpdateCarDto";
import { Car } from "src/Entities/CarEntity";
import { User } from "src/Entities/UserEntity";

export const carRepository = 'CarRepositoryInterface'
export interface CarRepositoryInterface {
    createCar(createCarDto: CreateCarDto, user: User)
    findOneCar(id: number, user: User)
    find(attrs: Partial<Car>, user: User)
    updateCar(id: number, updateCarDto: UpdateCarDto, user: User)
    removeCar(id: number, user: User)
}