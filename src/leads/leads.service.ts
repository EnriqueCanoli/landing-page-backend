import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepository: Repository<Lead>,
    private readonly mailService: MailService,
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

    const saved = await this.leadsRepository.save(lead);

    void this.mailService.sendLeadNotification(saved);

    return saved;
  }

  findAll(): Promise<Lead[]> {
    return this.leadsRepository.find({ order: { createdAt: 'DESC' } });
  }
}
