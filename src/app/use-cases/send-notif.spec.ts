import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { SendNotification } from "./send-notif";

describe('Send notification', () => {
	it('should be able to send notification', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const sendNotification = new SendNotification(notificationsRepo);

		const { notification } = await sendNotification.execute({
			content: 'this is another notification',
			category: 'system',
			recipientId: 'exampleid4',
		});

		// expect(notification).toBeTruthy();
		expect(notificationsRepo.notifications).toHaveLength(1);
		expect(notificationsRepo.notifications[0]).toEqual(notification);
	});
});