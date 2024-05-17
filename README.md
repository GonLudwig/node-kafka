# node-kafka

run bash
docker exec -it broker /opt/kafka/bin/kafka-topics.sh

docker exec -it broker /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe

docker exec -it broker /opt/kafka/bin/kafka-console-consumer.sh --topic ECOMMERCE_NEW_ORDER --bootstrap-server localhost:9092 --from-beginning

https://github.com/apache/kafka/tree/trunk