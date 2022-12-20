import { makeNotification } from "@test/factories/notifications-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { NotificationNotFound } from "./errors/notif-not-found";
import { UnreadRecipientNotification } from "./unread-notification";

describe('Unread notification', () => {
	it('should be able to unread notification', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const unreadNotification = new UnreadRecipientNotification(notificationsRepo);

		const notification = makeNotification({
			readAt: new Date(),
		});

		await notificationsRepo.create(notification);

		await unreadNotification.execute({
			notificationId: notification.id
		});

		expect(notificationsRepo.notifications[0].readAt).toBeNull()
	});


	it('should not be able to unread notification when it doesnt exist', () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const unreadNotification = new UnreadRecipientNotification(notificationsRepo);

		expect(() => {
			return  unreadNotification.execute({
				notificationId: 'fake-notification-id',
			});
		}).rejects.toThrow(NotificationNotFound);
	})
});