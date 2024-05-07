import { Kafka, Message, Producer, ProducerRecord } from "kafkajs";

class NewOrder {
    private readonly kafka: Kafka = new Kafka({
        brokers: ['broker:19092']
    });

    private readonly producer: Producer = this.kafka.producer();

    async produce(messages: Message[]) {
        const record: ProducerRecord = {
            topic: 'ECOMMERC_NEW_ORDER',
            messages: messages
        };

        await this.producer.connect();
        await this.producer.send(record);
        await this.producer.disconnect();
    }
}