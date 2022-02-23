import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/Entities/car.entity';
import { Reservation } from 'src/Entities/reservation.entity';
import { Repository } from 'typeorm';
import { Report } from '../Entities/report.entity';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private reportRepo : Repository<Report>,
    @InjectRepository(Car) private carRepo : Repository<Car>,
    @InjectRepository(Reservation) private reservationRepo : Repository<Reservation>){}

    async create(id: number, user: User): Promise<Report> {

        const report = await this.reportRepo.create()
     
        const car = await this.carRepo.findOne({where: {id, userId: user.id}})
        if(!car){
            throw new NotFoundException("Car not found")
        }
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
       
    async findAll( user: User) : Promise<Report[]>{
        return await this.reportRepo.find({where: {userId: user.id}})
    }

    async delete(id: number, user: User): Promise<Report>{
        const report_id = await this.reportRepo.findOne({where: {id, userId: user.id}})
        return this.reportRepo.remove(report_id)
    }



}
