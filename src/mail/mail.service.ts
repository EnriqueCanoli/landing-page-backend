import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Lead } from '../leads/entities/lead.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.get<string>('MAIL_USER'),
        pass: config.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendLeadNotification(lead: Lead): Promise<void> {
    const from = this.config.get<string>('MAIL_USER');
    const to = this.config.get<string>('MAIL_TO');

    const correoFila = lead.contactoCorreo
      ? `<tr>
           <td style="padding:8px 0;color:#555;width:180px;">Correo electrónico</td>
           <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.contactoCorreo}</td>
         </tr>`
      : '';

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8" /></head>
      <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                <!-- Encabezado -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0A3045,#1573A2);padding:32px 40px;">
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;">Centro de Entrenamiento Físico Senior</p>
                    <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;">Nuevo lead recibido</h1>
                  </td>
                </tr>

                <!-- Cuerpo -->
                <tr>
                  <td style="padding:36px 40px;">

                    <!-- Sección: Adulto mayor -->
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1573A2;">Adulto mayor</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8edf2;">
                      <tr>
                        <td style="padding:8px 0;color:#555;width:180px;">Nombre completo</td>
                        <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.seniorNombre} ${lead.seniorApellidos}</td>
                      </tr>
                      <tr style="background:#f9fafb;">
                        <td style="padding:8px 0;color:#555;">Edad</td>
                        <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.seniorEdad} años</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#555;">Zona / Colonia</td>
                        <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.seniorZona}</td>
                      </tr>
                    </table>

                    <!-- Sección: Contacto -->
                    <p style="margin:28px 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1573A2;">Persona de contacto</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8edf2;">
                      <tr>
                        <td style="padding:8px 0;color:#555;width:180px;">Nombre</td>
                        <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.contactoNombre}</td>
                      </tr>
                      <tr style="background:#f9fafb;">
                        <td style="padding:8px 0;color:#555;">Teléfono</td>
                        <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.contactoTelefono}</td>
                      </tr>
                      ${correoFila}
                    </table>

                  </td>
                </tr>

                <!-- Pie -->
                <tr>
                  <td style="background:#f4f6f8;padding:20px 40px;border-top:1px solid #e8edf2;">
                    <p style="margin:0;font-size:12px;color:#999;">
                      Recibido el ${lead.createdAt.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      a las ${lead.createdAt.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Centro Senior" <${from}>`,
        to,
        subject: `Nuevo lead: ${lead.seniorNombre} ${lead.seniorApellidos}`,
        html,
      });
      this.logger.log(`Notificación enviada a ${to}`);
    } catch (error) {
      this.logger.error('Error al enviar correo de notificación', error);
    }
  }
}
