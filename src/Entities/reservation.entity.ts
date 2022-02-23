import { User } from "src/Entities/user.entity";
import { Car } from "src/Entities/car.entity";
import { Report } from "src/Entities/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { Type } from "class-transformer";

@Entity()
export class Reservation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => Date)
    @Column('date', { nullable: true }) 
    startDate: Date;
    
    @Type(() => Date)
    @Column('date', { nullable: true })
    endDate: Date;

    @ManyToOne(() => Car, car => car.reservations)
    car: Car

    @ManyToOne(() => Report, report => report.reservation)
    report: Report;

    @ManyToOne(() => User, user => user.reservations)
    user: User

    @Column()
    userId: number

}