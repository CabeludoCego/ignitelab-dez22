import { makeNotification } from "@test/factories/notifications-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repo";
import { CancelNotification } from "./cancel-notif";
import { NotificationNotFound } from "./errors/notif-not-found";

describe('Cancel notification', () => {
	it('should be able to cancel notification', async () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const cancelNotification = new CancelNotification(notificationsRepo);

		const notification = makeNotification();

		await notificationsRepo.create(notification);

		await cancelNotification.execute({
			notificationId: notification.id
		});

		expect(notificationsRepo.notifications[0].cancelledAt).toEqual(
			expect.any(Date),
		);
	});


	it('should not be able to cancel notification when it doesnt exist', () => {
		const notificationsRepo = new InMemoryNotificationRepository();
		const cancelNotification = new CancelNotification(notificationsRepo);

		expect(() => {
			return cancelNotification.execute({
				notificationId: 'fake-notification-id',
			});
		}).rejects.toThrow(NotificationNotFound);
	})
});