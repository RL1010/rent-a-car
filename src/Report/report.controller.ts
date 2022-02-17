import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/getUser.decorator';
import { Report } from 'src/Entities/report.entity';
import { User } from 'src/Entities/user.entity';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { createReservationDto } from 'src/Reservation/dtos/createReservation.dto';
import { ReservationDto } from 'src/Reservation/dtos/reservation.dto';
import { ReportService } from './report.service';

@Controller('reports')
@UseGuards(AuthGuard())
export class ReportController {
constructor(private reportService: ReportService){}

    @Post('/create/:id')
    @Serialize(ReservationDto)
    async createReport(@Param('id') id: number,
                       @GetUser() user: User): Promise<Report>{
                return await this.reportService.create(id, user)
    }

    @Get()
    async findReport(@GetUser() user: User): Promise<Report[]>{
                 return await this.reportService.findAll(user)
    }
    
    @Delete('/:id')
    async deleteReservation(@Param('id') id: string,
                            @GetUser() user: User): Promise<Report>{
                return await this.reportService.delete(parseInt(id), user)
   }
}

