import { Kafka } from "kafkajs";

export default class KafkaConnect {
    kafka: Kafka
    constructor() {
        this.kafka = new Kafka({
            brokers: ['broker:19092'],
        })
    }
}