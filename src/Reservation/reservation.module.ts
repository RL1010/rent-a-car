import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Auth/auth.module';
import { Car } from 'src/Entities/CarEntity';
import { Report } from 'src/Entities/ReportEntity';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../Entities/ReservationEntity';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Car, Report]), AuthModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
