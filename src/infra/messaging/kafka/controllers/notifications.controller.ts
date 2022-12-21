import { SendNotification } from '@app/use-cases/send-notif';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface sendNotificationPayload {
	content: string;
	category: string;
	recipientId: string;
}

@Controller()
export class NotificationsController {
	constructor(private sendNotification: SendNotification) {}

	@EventPattern('notifications-sent')
	async handleSendNotification(
		@Payload() {content, category, recipientId} : sendNotificationPayload) {
			await this.sendNotification.execute({
				content,
				category,
				recipientId
			})
	}
}