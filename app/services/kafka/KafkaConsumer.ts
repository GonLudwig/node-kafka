import {
    Consumer,
    ConsumerConfig,
    ConsumerRunConfig,
    ConsumerSubscribeTopic,
    ConsumerSubscribeTopics,
    Kafka,
    KafkaConfig
} from "kafkajs";

export default class KafkaConsumer {

    private readonly kafka: Kafka;
    private readonly consumer: Consumer;

    constructor(kafkaConfig: KafkaConfig, config: ConsumerConfig)
    {
        this.kafka = new Kafka(kafkaConfig)
        this.consumer = this.kafka.consumer(config);
    }

    async poll(
        subscription: ConsumerSubscribeTopics | ConsumerSubscribeTopic,
        config?: ConsumerRunConfig
    ): Promise<void> {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe(subscription);
            this.consumer.run(config)
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR' + error.message)
            }
        }
    }
}
