import { Consumer, Kafka} from "kafkajs";

class EmailService {
    private readonly kafka: Kafka = new Kafka({
        brokers: ['broker:19092']
    });

    private readonly consumer: Consumer = this.kafka.consumer({
        groupId: 'EmailService',
        // partitionAssigners: <Array>,
        // sessionTimeout: <Number>,
        // rebalanceTimeout: <Number>,
        // heartbeatInterval: <Number>,
        // metadataMaxAge: <Number>,
        // allowAutoTopicCreation: <Boolean>,
        // maxBytesPerPartition: <Number>,
        // minBytes: <Number>,
        // maxBytes: <Number>,
        // maxWaitTimeInMs: <Number>,
        // retry: <Object>,
        // maxInFlightRequests: <Number>,
        // rackId: <String>
    });

    async poll() {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topics: ['ECOMMERCE_SEND_EMAIL'], fromBeginning: true});
            this.consumer.run({
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
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR' + error.message)
            }
        }
    }
}

const order = new EmailService();
order.poll();