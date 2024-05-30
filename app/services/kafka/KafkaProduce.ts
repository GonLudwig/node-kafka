import {
    Kafka,
    KafkaConfig,
    Producer,
    ProducerConfig,
    ProducerRecord,
    RecordMetadata
} from "kafkajs";

export default class KafkaProduce {
    private readonly kafka: Kafka;
    private readonly producer: Producer;

    constructor(kafkaConfig: KafkaConfig, config?: ProducerConfig)
    {
        this.kafka = new Kafka(kafkaConfig);
        this.producer = this.kafka.producer(config);
    }

    async produce(
        record: ProducerRecord,
        callback: (value: RecordMetadata, index: number, array: RecordMetadata[]) => any
    ): Promise<void> {
        try {
            await this.producer.connect();
            const producer: RecordMetadata[] = await this.producer.send(record);
            producer.map(callback)
            await this.producer.disconnect();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('ERROR: '+error.message)
            }
        }
    }
}
