import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateLeadDto {
  // ── Datos del adulto mayor ──────────────────────────────
  @IsString()
  @IsNotEmpty({ message: 'El nombre del adulto mayor es requerido' })
  @MaxLength(100)
  seniorNombre: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos del adulto mayor son requeridos' })
  @MaxLength(150)
  seniorApellidos: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(50, { message: 'La edad mínima es 50 años' })
  @Max(110, { message: 'La edad máxima es 110 años' })
  seniorEdad: number;

  @IsString()
  @IsNotEmpty({ message: 'La zona o colonia es requerida' })
  @MaxLength(150)
  seniorZona: string;

  // ── Datos de la persona de contacto ────────────────────
  @IsString()
  @IsNotEmpty({ message: 'El nombre del contacto es requerido' })
  @MaxLength(100)
  contactoNombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono del contacto es requerido' })
  @MaxLength(20)
  contactoTelefono: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @MaxLength(150)
  contactoCorreo?: string;
}
