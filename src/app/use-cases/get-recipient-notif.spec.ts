import { makeNotification } from "@test/factories/notifications-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { GetRecipientNotification } from "./get-recipient-notif";

describe('Get recipient notification', () => {
	it('should be able to get recipient notifications', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const getRecipNotifications = new GetRecipientNotification(notificationsRepo);

		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 1'}));
 
		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 2'}));

		await notificationsRepo.create(
			makeNotification({recipientId: 'recipiente 1'}));

		const { notifications } = await getRecipNotifications.execute({
			recipientId: 'recipiente 1',
		});

		expect(notifications).toHaveLength(2);
		expect(notifications).toEqual(expect.arrayContaining([
			expect.objectContaining({recipientId: 'recipiente 1'}),
			expect.objectContaining({recipientId: 'recipiente 1'}),
			]),
		);
	});

});