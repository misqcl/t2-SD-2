const express = require("express");
const {Kafka} = require('kafkajs')

const app = express();

app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const producer = kafka.producer();

const run = async() =>{
    const consumer = kafka.consumer({groupId:"t1"});
    await consumer.connect();
    console.log('Listening');   
    await consumer.subscribe({topic: 'test'});
    await consumer.run({
        eachMesagge: async ({topic,partition,message}) =>{
           console.log({
            value: message.value.toString(),

           }) ;
        },
    })
}

var counter = 1;

app.post("/test",async (req,res) =>{
    await producer.connect();
    await producer.send({
        topic: 'test',
        messages: [
            {value: 'Hello kafkaJS user ${counter}'},
        ],
    });
    await producer.disconnect();
    counter++;
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
    run();
});