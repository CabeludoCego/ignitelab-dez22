import { makeNotification } from "@test/factories/notifications-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { NotificationNotFound } from "./errors/notif-not-found";
import { ReadRecipientNotification } from "./read-notification";

describe('Read notification', () => {
	it('should be able to read notification', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const readNotification = new ReadRecipientNotification(notificationsRepo);

		const notification = makeNotification();

		await notificationsRepo.create(notification);

		await readNotification.execute({
			notificationId: notification.id
		});

		expect(notificationsRepo.notifications[0].readAt).toEqual(
			expect.any(Date),
		);
	});


	it('should not be able to read notification when it doesnt exist', () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const readNotification = new ReadRecipientNotification(notificationsRepo);

		expect(() => {
			return  readNotification.execute({
				notificationId: 'fake-notification-id',
			});
		}).rejects.toThrow(NotificationNotFound);
	})
});