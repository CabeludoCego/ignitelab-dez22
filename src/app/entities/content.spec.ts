import { Content } from "./content"

describe('Notification content', () => {
	
	it('should be able to create notification content', () => {
		const content = new Content('Voce recebeu solicitacao de amizade.');

		expect(content).toBeTruthy();
	})

	it('should not be able to create notification content less than 5 characters', () => {
		expect(() => new Content('uau')).toThrow();
	})

	it('should not be able to create notification content greater than 240 characters', () => {
		expect(() => new Content('u'.repeat(242))).toThrow();
	})
})


