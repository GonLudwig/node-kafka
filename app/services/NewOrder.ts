import KafkaProduce from "./kafka/KafkaProduce";

export default class NewOrder {

    private readonly kafka: KafkaProduce;

    constructor()
    {
        this.kafka = new KafkaProduce(
            {
                brokers: ['broker:19092']
            }
        );
    }

    public async post(): Promise<void>
    {
        this.kafka.produce(
            {
                topic: 'ECOMMERCE_NEW_ORDER',
                messages: [{
                    key: Date.now()+ '', 
                    value: JSON.stringify({name: 'John', price: 2.23})
                }]
            },
            (prod) => console.log(
                'SUCESS ' + prod.topicName + ':::partition ' + prod.partition + '/ offset' + prod.baseOffset + '/ timestamp' + prod.logStartOffset
            )
        );
        
        this.kafka.produce(
            {
                topic: 'ECOMMERCE_SEND_EMAIL',
                messages: [{
                    key: Date.now()+ '',
                    value: 'Thank you for your order!'
                }]
            },
            (prod) => console.log(
                'SUCESS ' + prod.topicName + ':::partition ' + prod.partition + '/ offset' + prod.baseOffset + '/ timestamp' + prod.logStartOffset
            )
        );
    }
}
