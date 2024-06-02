import KafkaConsumer from "./kafka/KafkaConsumer";

export default class EmailService {

    private readonly consumer: KafkaConsumer;

    constructor()
    {
        this.consumer = new KafkaConsumer(
            {
                brokers: ['broker:19092']
            },
            {
                groupId: 'EmailService'
            }
        )
    }

    public async poll(): Promise<void>
    {
        this.consumer.poll(
            { topics: ['ECOMMERCE_SEND_EMAIL'], fromBeginning: true},
            {
                autoCommitInterval: 1000,
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        topic,
                        partition,
                        key: message.key?.toString(),
                        value: message.value?.toString(),
                        headers: message.headers,
                    })
                },
            }
        )
    }
}
