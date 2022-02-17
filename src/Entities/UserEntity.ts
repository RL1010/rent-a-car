import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Reservation } from "src/Entities/ReservationEntity";
import { Car } from "./CarEntity";
import { Report } from "./ReportEntity";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    salt:string;

    @OneToMany(type => Reservation, reservation => reservation.user, {eager: true})
    reservations: Reservation[]


    @OneToMany(type => Car, car => car.user, {eager: true})
    cars: Car[]

    @OneToMany(type => Report, report => report.user, {eager: true})
    reports: Report[]

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}