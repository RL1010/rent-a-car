import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { createReservationDto } from './dtos/createReservation.dto';
import{ Reservation } from '../Entities/reservation.entity'
import { Car } from 'src/Entities/car.entity';

@Injectable()
export class ReservationService {
    constructor(@InjectRepository(Reservation) private reservationRepo: Repository <Reservation> ,
                @InjectRepository(Car) private carRepo: Repository <Car> ) {}

    async create(id: number, createReserevation: createReservationDto, user: User ): Promise<Reservation> {
        const carId = await this.carRepo.findOne(id)
        if (!carId) {
        throw new NotFoundException(`There is no car with id ${id}`)
        }
        const findRes = await this.reservationRepo.find({where: {car: id}})

        findRes.forEach(res => {
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            const from = new Date(createReserevation.startDate)
            const to = new Date(createReserevation.endDate)
            const startDate = new Date(res.startDate)
            const endDate = new Date(res.endDate)
                     
            if(from > to){
                throw new NotFoundException(`End Date must be grater then start Date`)
            }
            if (from >= startDate && to <= endDate  ) {
                throw new NotFoundException(`Sorry these dates are booked`)
            }if(from <= endDate && to >= endDate || from <= startDate && to >= startDate  ){
                throw new NotFoundException(`You can book the car only before ${monthNames[startDate.getMonth()]} ${startDate.getUTCDate()} or after  ${monthNames[endDate.getMonth()]} ${endDate.getUTCDate()}`)
            }
        })
            const reservation = this.reservationRepo.create(createReserevation)
            reservation.car = carId
            reservation.user = user
        
            return this.reservationRepo.save(reservation)
    }

    async update(id: number, attrs: Partial <Reservation> , carId: number, user: User): Promise < UpdateResult > {
            const reservation = await this.reservationRepo.findOne({where: {id, userId: user.id}})
            if (!reservation) {
            throw new NotFoundException(`The reservation does not exists`)
            }
            const car = await this.carRepo.findOne({where: {id: carId, userId: user.id}})
        
            if (!car) {
            throw new NotFoundException(`Sorry this car does not exists`)
            }
            const newRes = await this.reservationRepo.update(reservation.id, {car: car})
            return newRes
    }

    async deleteReservation(id: number, user: User): Promise<void>{
            const result = await this.reservationRepo.findOne({where: {id, userId: user.id}})
            if(!result){
                throw new NotFoundException(`Reservation with id ${id} not found`)
            }
            await this.reservationRepo.delete(result)
    }

    async getAllReservations(user: User): Promise<Reservation[]>{
            const reservation = await this.reservationRepo.find({where: {userId: user.id}})
            console.log(reservation);
            return reservation
    }

    async getReservationById(id: number, user: User): Promise<Reservation>{
            const reservation = await this.reservationRepo.findOne({where: {id, userId: user.id}})
            if(!reservation){
                throw new NotFoundException(`Reservation with id ${id} not found`)
            }
            return reservation
    }
}