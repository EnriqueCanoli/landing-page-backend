/**
 * Polyfill para Node.js 18: global `crypto` no existe hasta Node 19.
 * @nestjs/typeorm usa crypto.randomUUID() y falla en Node 18 sin esto.
 * En Node 19+ ya viene integrado y es de solo lectura, por eso se verifica primero.
 */
import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
  (globalThis as Record<string, unknown>).crypto = webcrypto;
}
