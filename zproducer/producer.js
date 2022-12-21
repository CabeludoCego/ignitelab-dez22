
import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap(){
	const kafka = new Kafka
		({
				clientId: 'test-producer',
				brokers: ['prime-vervet-5608-us1-kafka.upstash.io:9092'],
				sasl: {
					mechanism: 'scram-sha-256',
					username: 'cHJpbWUtdmVydmV0LTU2MDgkWkROUbKZmvDx_qBNRTe5SeR8R7WlR0xAZ3TPCGg',
					password: 'FTdrTzkXz5IZCSKB21Es-74HdyZ3s8NCajCqShnpLv7aKr767RZw6WaqOE2U6AHd_iUP9Q==',
				},
				ssl: true,
		})

	const producer = kafka.producer();
		
	await producer.connect()
	await producer.send({
		topic: 'notifications-sent',
    messages: [
			{
				value: JSON.stringify({
					content: 'New battle request',
					category: 'combat',
					recipientId: randomUUID(),
				})
			}
		],
	})

	await producer.disconnect()
}

bootstrap()