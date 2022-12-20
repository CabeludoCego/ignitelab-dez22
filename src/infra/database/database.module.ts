import { Module } from "@nestjs/common";
import { NotificationsRepository } from "src/app/repositories/notif-repo";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepository } from "./prisma/repositories/prisma-notif-repo";

@Module({
	providers: [
		PrismaService,
		{
			provide: NotificationsRepository,
			useClass: PrismaNotificationsRepository,
		}
	],
	exports: [
		NotificationsRepository,
	]
})
export class DatabaseModule {}