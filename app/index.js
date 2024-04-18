const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['broker:9092'],
})

const producer = kafka.admin()

const teste = async () => {
    // await producer.connect()
    // await producer.send({
    //   topic: 'test-topic-10',
    //   messages: [
    //     {  key: 'key1', value: 'Hello KafkaJS user!' },
    //   ],
    // })
    
    // await producer.disconnect()
    console.log(await admin.listTopics())
}

teste()

// const consumer = kafka.consumer({ groupId: 'test-group' })

// const teste2 = async () => {
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//           value: message.value.toString(),
//         })
//       },
//     })
// }

// teste2()