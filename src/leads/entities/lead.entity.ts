import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  // ── Datos del adulto mayor ──────────────────────────────
  @Column({ name: 'senior_nombre', length: 100 })
  seniorNombre: string;

  @Column({ name: 'senior_apellidos', length: 150 })
  seniorApellidos: string;

  @Column({ name: 'senior_edad', type: 'smallint' })
  seniorEdad: number;

  @Column({ name: 'senior_zona', length: 150 })
  seniorZona: string;

  // ── Datos de la persona de contacto ────────────────────
  @Column({ name: 'contacto_nombre', length: 100 })
  contactoNombre: string;

  @Column({ name: 'contacto_telefono', length: 20 })
  contactoTelefono: string;

  @Column({ name: 'contacto_correo', length: 150, nullable: true })
  contactoCorreo: string | null;

  // ── Auditoría ───────────────────────────────────────────
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
