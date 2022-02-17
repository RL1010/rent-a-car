import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Auth/auth.module';
import { Car } from 'src/Entities/car.entity';
import { Report } from 'src/Entities/report.entity';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../Entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Car, Report]), AuthModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
