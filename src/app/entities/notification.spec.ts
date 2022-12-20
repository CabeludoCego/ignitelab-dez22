import { Content } from "./content"
import { Notification } from "./notification";

describe('Notification', () => {
	
	it('should be able to create notification', () => {
		const notification = new Notification({
			content: new Content('Nova solicit'),
			category: 'social',
			recipientId: 'exampleid',
		})
		
		expect(notification).toBeTruthy();
	})
})


