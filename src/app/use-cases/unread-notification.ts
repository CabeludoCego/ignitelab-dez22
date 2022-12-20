import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notif-repo";
import { NotificationNotFound } from "./errors/notif-not-found";

interface UnreadRecipientNotificationRequest {
	notificationId: string;
}

type UnreadRecipientNotificationResponse = void;


@Injectable()
export class UnreadRecipientNotification {
	constructor(private notificationsRepository: NotificationsRepository) {}
	
	async execute(
		request: UnreadRecipientNotificationRequest, 
		): Promise<UnreadRecipientNotificationResponse> {
		const { notificationId } = request;

		const notification = 
			await this.notificationsRepository.findById(notificationId);	

		if (!notification){
			throw new NotificationNotFound();
		}

		notification.unread();

		await this.notificationsRepository.save(notification);
	}
}