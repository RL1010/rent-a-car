import { User } from "src/Entities/UserEntity";
import { Car } from "src/Entities/CarEntity";
import { Report } from "src/Entities/ReportEntity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, BaseEntity } from "typeorm";
import { Type } from "class-transformer";

@Entity()
export class Reservation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    //  @Type((startDate) => moment(startDate).format('DD/MM/YY'))
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