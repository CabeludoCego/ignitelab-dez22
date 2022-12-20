import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notif-repo";
import { NotificationNotFound } from "./errors/notif-not-found";

interface ReadRecipientNotificationRequest {
	notificationId: string;
}

type ReadRecipientNotificationResponse = void;


@Injectable()
export class ReadRecipientNotification {
	constructor(private notificationsRepository: NotificationsRepository) {}
	
	async execute(
		request: ReadRecipientNotificationRequest, 
		): Promise<ReadRecipientNotificationResponse> {
		const { notificationId } = request;

		const notification = 
			await this.notificationsRepository.findById(notificationId);	

		if (!notification){
			throw new NotificationNotFound();
		}

		notification.read();

		await this.notificationsRepository.save(notification);
	}
}