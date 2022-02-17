import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/GetUserDecorator';
import { Report } from 'src/Entities/ReportEntity';
import { User } from 'src/Entities/UserEntity';
import { createReservationDto } from 'src/Reservation/dtos/CreateReservationDto';
import { ReportService } from './report.service';

@Controller('reports')
@UseGuards(AuthGuard())
export class ReportController {
constructor(private reportService: ReportService){}

    @Post('/create/:id')
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

