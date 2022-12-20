import { CancelNotification } from "@app/use-cases/cancel-notif";
import { CountRecipientNotification } from "@app/use-cases/count-recip-notifications";
import { GetRecipientNotification } from "@app/use-cases/get-recipient-notif";
import { ReadRecipientNotification } from "@app/use-cases/read-notification";
import { UnreadRecipientNotification } from "@app/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/app/use-cases/send-notif";
import { DatabaseModule } from "../database/database.module";
import { NotificationController } from "./controllers/notification.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [NotificationController],
	providers: [SendNotification,
		CancelNotification,
		CountRecipientNotification,
		GetRecipientNotification,
		ReadRecipientNotification,
		UnreadRecipientNotification
	],
})
export class HttpModule {}