import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { report } from 'process';
import { Car } from 'src/Entities/CarEntity';
import { createReservationDto } from 'src/Reservation/dtos/CreateReservationDto';
import { Reservation } from 'src/Entities/ReservationEntity';
import { Repository } from 'typeorm';
import { Report } from '../Entities/ReportEntity';
import { User } from 'src/Entities/UserEntity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private reportRepo : Repository<Report>,
    @InjectRepository(Car) private carRepo : Repository<Car>,
    @InjectRepository(Reservation) private reservationRepo : Repository<Reservation>){}

    async create(id: number, user: User): Promise<Report> {

        const report = await this.reportRepo.create()
        // const car = await this.carRepo.findOne(id, {relations: ["reservations"]})
        const car = await this.carRepo.findOne({where: {id, userId: user.id}})
        report.car = car
        
        const res = await this.reservationRepo.find({where: {car: id, userId: user.id}})   
        let resByMonth = []
        res.forEach((reservations) => {
            const {startDate, endDate} = reservations
            let sDate = new Date(`${startDate}`)
            let eDate = new Date(`${endDate}`)
            let today = new Date()
            let month = today.getMonth()
           
            if(sDate.getMonth() >= month+1 && eDate.getMonth() <= month+1){
                resByMonth.push(reservations)
            }          
        })
                
        let total = car.price * resByMonth.length;      
        report.totalForMonth = total
        report.reservation = resByMonth
        report.user = user
        
        return this.reportRepo.save(report)
    }
    
    async delete(id: number, user: User): Promise<Report>{
        const report_id = await this.reportRepo.findOne({where: {id, userId: user.id}})
        return this.reportRepo.remove(report_id)
    }
    
    async findAll( user: User) : Promise<Report[]>{
        return await this.reportRepo.find({where: {userId: user.id}})
    }



}
