
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "src/Entities/car.entity";
import { Reservation } from "src/Entities/reservation.entity";
import { User } from "src/Entities/user.entity";
import { ReservationRepositoryInterface } from "src/Interfaces/RepositoryInterface/reservationRepository.interface";
import { createReservationDto } from "src/Reservation/dtos/createReservation.dto";
import { AbstractRepository, EntityRepository, Repository } from "typeorm";

@EntityRepository(Reservation)
export class ReservationRepository extends AbstractRepository<Reservation> implements ReservationRepositoryInterface{
    constructor(@InjectRepository(Car) private carRepo: Repository<Car> ){
    super();
}
    async createReservation(id: number, createReservationDto: createReservationDto, user : User){
        const reservation = this.repository.create(createReservationDto)
        reservation.user = user
        
        return this.repository.save(reservation)
    }
}