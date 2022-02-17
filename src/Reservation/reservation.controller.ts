import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { createReservationDto } from './dtos/CreateReservationDto';
import { UpdateReservationDto } from './dtos/UpdateReservationDto';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dtos/ReservationDto';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { GetUser } from 'src/Auth/GetUserDecorator';
import { User } from 'src/Entities/UserEntity';
import { AuthGuard } from '@nestjs/passport';
import { Reservation } from 'src/Entities/ReservationEntity';

@Controller('reservation')
@UseGuards(AuthGuard())
export class ReservationController {
constructor(private reservationService: ReservationService){}

    @Post('/create/:id')
    @Serialize(ReservationDto)
    createReservation(@Param('id') id: string, 
                    @Body() body: createReservationDto,
                    @GetUser() user: User):Promise<Reservation>{
            return this.reservationService.create(parseInt(id),body, user)
    }

    @Patch('/update/:id')
    updateReservation(@Param('id') id: string,
                      @Body() body: UpdateReservationDto){
            return this.reservationService.update(parseInt(id), body, body.carId)
   }

   @Delete('/:id')
   deleteReservation(
                    @Param('id') id: string,
                    @GetUser() user: User): Promise<void>{
            return this.reservationService.deleteReservation(parseInt(id), user)
   }

   @Get()
   getReservations(@GetUser() user: User): Promise<Reservation[]>{
            return this.reservationService.getAllReservations(user)
    }

    @Get('/:id')
    getReservationById(
                    @Param('id') id: number,
                    @GetUser() user: User): Promise<Reservation>{
            return this.reservationService.getReservationById(id, user)
    }
}
