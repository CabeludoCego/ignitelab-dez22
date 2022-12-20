// import { Content } from "@app/entities/content";
// import { Notification } from "@app/entities/notification";
import { makeNotification } from "@test/factories/notifications-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { CountRecipientNotification } from "./count-recip-notifications";

describe('Count recipient notification', () => {
	it('should be able to count notifications', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const countRecipNotifications = new CountRecipientNotification(notificationsRepo);

		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 1'}));

		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 2'}));

		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 1'}));

		const { count } = await countRecipNotifications.execute({
			recipientId: 'recipiente 1',
		});

		expect(count).toEqual(2)
	});

});