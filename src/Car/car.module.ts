import { Global, Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRespository } from 'src/Repositories/CarRepository';
import { carRepository } from 'src/Interfaces/RepositoryInterface/carRepository.interface';
import { EntityManager } from 'typeorm';
import { carService } from 'src/Interfaces/ServiceInterface/carService.interface';

@Global()
@Module({
  imports: [AuthModule],
  controllers: [CarController],
  providers: [
   {provide: carService, useClass: CarService},
     {provide: carRepository, 
        useFactory: (em: EntityManager) => em.getCustomRepository(CarRespository),
        inject: [EntityManager] }
    ],
  exports: [carRepository]
})
export class CarModule {}
