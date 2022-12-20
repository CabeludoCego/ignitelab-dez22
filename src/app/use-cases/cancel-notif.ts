import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notif-repo";
import { NotificationNotFound } from "./errors/notif-not-found";

interface CancelNotificationRequest {
	notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
	constructor(private notificationsRepository: NotificationsRepository) {}
	
	async execute(
		request: CancelNotificationRequest, 
		): Promise<CancelNotificationResponse> {
		const { notificationId } = request;

		const notification = await this.notificationsRepository.findById(
			notificationId 
		);	

		if (!notification){
			throw new NotificationNotFound();
		}

		notification.cancel();

		await this.notificationsRepository.save(notification);

	}
}