/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	// Para ver alterações/resultados das requisições HTTP no console.
	// constructor(){
	// 	super({
	// 		log: ['query'],
	// 	});
	// }
	
	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
		await app.close();
		});
	}
}
