
import { Report } from "src/Entities/report.entity";
import { Reservation } from "src/Entities/reservation.entity";
import { AfterInsert, AfterRemove, AfterUpdate, BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Car extends BaseEntity {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('int')
    year: number;

    @Column()
    company: string;
    
    @Column('int')
    price: number;

    @OneToMany( () => Reservation, reservation => reservation.car)
    reservations: Reservation[]

    @OneToOne(() => Report, report => report.car)
    report: Report;

    @ManyToOne(type => User, user => user.cars)
    user: User  

    @Column()
    userId: string

}