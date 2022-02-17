import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { createReservationDto } from './dtos/createReservation.dto';
import { UpdateReservationDto } from './dtos/updateReservation.dto';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dtos/reservation.dto';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { GetUser } from 'src/Auth/getUser.decorator';
import { User } from 'src/Entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Reservation } from 'src/Entities/reservation.entity';

@Controller('reservation')
@UseGuards(AuthGuard())
export class ReservationController {
constructor(private reservationService: ReservationService){}

    @Post('/create/:id')
    @Serialize(ReservationDto)
    createReservation(@Param('id') id: string, 
                    @Body(ValidationPipe) body: createReservationDto,
                    @GetUser() user: User):Promise<Reservation>{
            return this.reservationService.create(parseInt(id),body, user)
    }

    @Patch('/update/:id')
    updateReservation(@Param('id') id: string,
                      @Body(ValidationPipe) body: UpdateReservationDto,
                      @GetUser() user: User){
            return this.reservationService.update(parseInt(id), body, body.carId, user)
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
