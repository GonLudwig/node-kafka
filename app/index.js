const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  brokers: ['broker:19092'],
})

const producer = kafka.producer()

const teste = async () => {
    await producer.connect()
    await producer.send({
        topic: 'LOJA_NOVO_PEDIDO',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    await producer.disconnect()
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