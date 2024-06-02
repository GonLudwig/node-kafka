import KafkaConsumer from "./kafka/KafkaConsumer";

export default class FraudDetector {

    private avgMessageSize = 280;
    private numberMessageReceive = 1;
    private maxBytesPerPartition = this.numberMessageReceive * this.avgMessageSize;
    private maxBytes = 32 * this.maxBytesPerPartition;

    private readonly consumer: KafkaConsumer;

    constructor()
    {
        this.consumer = new KafkaConsumer(
            {
                brokers: ['broker:19092'],
                clientId: 'FraudDetector'
            },
            {
                groupId: 'FraudDetector',
                maxBytesPerPartition: this.maxBytesPerPartition,
                maxBytes: this.maxBytes
            }
        )
    }

    public async poll(): Promise<void>
    {
        this.consumer.poll(
            { topics: ['ECOMMERCE_NEW_ORDER'], fromBeginning: true},
            {
                autoCommitInterval: 5000,
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        topic,
                        partition,
                        key: message.key?.toString(),
                        value: message.value != null ? JSON.parse(message.value?.toString()) : 'null',
                        headers: message.headers
                    })
                },
            }
        )
    }
}
