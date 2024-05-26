import { Kafka, Message, Producer, ProducerRecord, RecordMetadata } from "kafkajs";

class NewOrder {
    private readonly kafka: Kafka = new Kafka({
        brokers: ['broker:19092']
    });

    private readonly producer: Producer = this.kafka.producer();

    async produce(topic: string, messages: Message[]) {
        const record: ProducerRecord = {
            topic,
            messages: messages
        };
        
        try {
            await this.producer.connect();
            const producer: RecordMetadata[] = await this.producer.send(record);
            await this.producer.disconnect();
            producer.map((prod) => console.log(
                'SUCESS ' + prod.topicName + ':::partition ' + prod.partition + '/ offset' + prod.baseOffset + '/ timestamp' + prod.logStartOffset
            ))
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('ERROR' + error.message)
            }
        }
    }
}

const order = new NewOrder();
order.produce(
    'ECOMMERCE_NEW_ORDER',
    [{ value: 'Hello KafkaJS user!' }]
);

order.produce(
    'ECOMMERCE_SEND_EMAIL',
    [{ value: 'Thank you for your order!' }]
);