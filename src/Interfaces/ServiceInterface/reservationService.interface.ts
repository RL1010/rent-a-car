import { User } from "src/Entities/user.entity";
import { createReservationDto } from "src/Reservation/dtos/createReservation.dto";



export const reservationService = 'ReservationServiceInterface'
export interface ReservationServiceInterface {

    createReservation(id: number, createReservationDto: createReservationDto, user: User)
}