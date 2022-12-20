import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notif-repo";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationsMapper } from "../mappers/notif-prisma-mappers";
import { prisma } from "@prisma/client";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
	constructor(private prismaService: PrismaService) {}

	async findById(notificationId: string): Promise<Notification | null> {
		const notification = await this.prismaService.notification.findUnique({
			where: {
				id: notificationId,
			}
		})

		if(!notification) {
			return null;
		}

		return PrismaNotificationsMapper.toDomain(notification)

	}

	async countManyByRecipientId(recipientId: string): Promise<number> {
		const count = await this.prismaService.notification.count({
			where: {
				recipientId,
			},
		});
		return count;
	}

	async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
		const notifications = await this.prismaService.notification.findMany({
			where: {
				recipientId,
			}
		});

		return notifications.map((notification) => {
			return PrismaNotificationsMapper.toDomain(notification) 
		});
	}
	
	async create(notification: Notification): Promise<void> {
		const raw = PrismaNotificationsMapper.toPrisma(notification);
			
		await this.prismaService.notification.create({
			
			data:raw,
		});
	};

	async save(notification: Notification): Promise<void> {
		const raw = PrismaNotificationsMapper.toPrisma(notification);

		await this.prismaService.notification.update({
			where: {
				id: raw.id,
			},
			data: raw,
		});
	}

	

};