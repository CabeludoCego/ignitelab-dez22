import { CancelNotification } from '@app/use-cases/cancel-notif';
import { CountRecipientNotification } from '@app/use-cases/count-recip-notifications';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notif';
import { ReadRecipientNotification } from '@app/use-cases/read-notification';
import { UnreadRecipientNotification } from '@app/use-cases/unread-notification';
import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notif';
import { CreateNotificationBody } from '../dtos/post-notif-body';
import { NotificationViewModel } from '../view-models/notification-view-models';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadRecipientNotification,
    private unreadNotification: UnreadRecipientNotification,
    private countNotification: CountRecipientNotification,
    private getNotifications: GetRecipientNotification,
    ){}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { count } = await this.countNotification.execute({
      recipientId,
    });

    return {count,};
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { notifications } = await this.getNotifications.execute({
      recipientId,
    });

    return {notifications: notifications.map(NotificationViewModel.toHTTP)};
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification)
  
    }
  }

}
