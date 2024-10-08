import { PrismaClient } from '@prisma/client';

let client: PrismaClient;

export default async function getClient() {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}