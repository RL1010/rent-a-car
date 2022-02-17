
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "src/Entities/CarEntity";
import { Reservation } from "src/Entities/ReservationEntity";
import { User } from "src/Entities/UserEntity";
import { carRepository, CarRepositoryInterface } from "src/Interfaces/RepositoryInterface/CarRepositoryInterface";
import { ReservationRepositoryInterface } from "src/Interfaces/RepositoryInterface/ReservationRepositoryInterface";
import { createReservationDto } from "src/Reservation/dtos/CreateReservationDto";
import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import { CarRespository } from "./CarRepository";


@EntityRepository(Reservation)
export class ReservationRepository extends AbstractRepository<Reservation> implements ReservationRepositoryInterface{
    constructor(@InjectRepository(Car) private carRepo: Repository< Car > ){
    super();
}
    async createReservation(id: number, createReservationDto: createReservationDto, user : User){
         
        const reservation = this.repository.create(createReservationDto)
        // reservation.car = carId
        reservation.user = user
        
        return this.repository.save(reservation)
    }
}