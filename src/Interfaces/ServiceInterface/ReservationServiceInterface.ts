import { User } from "src/Entities/UserEntity";
import { createReservationDto } from "src/Reservation/dtos/CreateReservationDto";



export const reservationService = 'ReservationServiceInterface'
export interface ReservationServiceInterface {

    createReservation(id: number, createReservationDto: createReservationDto, user: User)
}