import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka 
	implements OnModuleDestroy {
		constructor(){
			super({
				client:{
					clientId: 'notifications',
					brokers: ['prime-vervet-5608-us1-kafka.upstash.io:9092'],
					sasl: {
						mechanism: 'scram-sha-256',
						username: 'cHJpbWUtdmVydmV0LTU2MDgkWkROUbKZmvDx_qBNRTe5SeR8R7WlR0xAZ3TPCGg',
						password: 'FTdrTzkXz5IZCSKB21Es-74HdyZ3s8NCajCqShnpLv7aKr767RZw6WaqOE2U6AHd_iUP9Q==',
					},
					ssl: true,
				},
			});
		}

	async onModuleDestroy(){
		await this.close();
	}
}