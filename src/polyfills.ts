/**
 * Polyfill para Node.js 18: global `crypto` no existe hasta Node 19.
 * @nestjs/typeorm usa crypto.randomUUID() y falla en Node 18 sin esto.
 */
import { webcrypto } from 'node:crypto';
(globalThis as Record<string, unknown>).crypto = webcrypto;
