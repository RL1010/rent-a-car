import { Car } from "src/Entities/CarEntity";
import { Reservation } from "src/Entities/ReservationEntity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class Report extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalForMonth: number

    @OneToOne(() => Car, car => car.report)
    @JoinColumn()
    car: Car;

    @OneToMany(() => Reservation, reservation => reservation.report, {cascade : true})
    reservation: Reservation[];

    @ManyToOne(() => User, user => user.reports)
    user: User

    @Column()
    userId: number



}