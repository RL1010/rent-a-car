import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './Entities/CarEntity';
import { CarModule } from './Car/car.module';
import { Report } from './Entities/ReportEntity';
import { ReportModule } from './Report/report.module';
import { Reservation } from './Entities/ReservationEntity';
import { ReservationModule } from './Reservation/reservation.module';
import { AuthModule } from './Auth/auth.module';
import { User } from './Entities/UserEntity';
import { UserRepository } from './Repositories/UserRepostiroy';
import { CarRespository } from './Repositories/CarRepository';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test11', 
    entities: [Car, Report, Reservation, User],
    synchronize: true,
  }),
  CarModule, ReportModule, ReservationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}