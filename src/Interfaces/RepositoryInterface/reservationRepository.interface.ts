import { User } from "src/Entities/user.entity";
import { createReservationDto } from "src/Reservation/dtos/createReservation.dto";


export const reservationRepository = 'ReservationRepositoryInterface'
export interface ReservationRepositoryInterface {

    createReservation(id: number, createReservationDto: createReservationDto, user: User)
}