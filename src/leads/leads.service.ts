import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepository: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadsRepository.create({
      seniorNombre: dto.seniorNombre,
      seniorApellidos: dto.seniorApellidos,
      seniorEdad: dto.seniorEdad,
      seniorZona: dto.seniorZona,
      contactoNombre: dto.contactoNombre,
      contactoTelefono: dto.contactoTelefono,
      contactoCorreo: dto.contactoCorreo ?? null,
    });

    return this.leadsRepository.save(lead);
  }

  findAll(): Promise<Lead[]> {
    return this.leadsRepository.find({ order: { createdAt: 'DESC' } });
  }
}
