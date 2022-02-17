import { User } from "src/Entities/UserEntity";
import { createReservationDto } from "src/Reservation/dtos/CreateReservationDto";


export const reservationRepository = 'ReservationRepositoryInterface'
export interface ReservationRepositoryInterface {

    createReservation(id: number, createReservationDto: createReservationDto, user: User)
}