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
    await consumer.subscribe({topic: 'venta'});
    await consumer.run({
        eachMesagge: async ({topic,partition,message}) =>{
           console.log({
            value: message.value.toString(),

           }) ;
        },
    })
}

const maestro1 = kafka.producer();
const maestro2 = kafka.producer();
const maestro3 = kafka.producer();
const maestroP1 = kafka.producer();
const maestroP2 = kafka.producer();

var motes1 = 10;
var motes2 = 10;
var motes3 = 10;
var motes4 = 10;
var motes5 = 10;

app.post("/compra_maestro1",async (req,res) =>{
    await maestro1.connect();
    if(motes1>0){
        motes1--;
    await maestro1.send({
        topic: 'venta',
        messages: [
            {value: 'Se ha comprado un mote, motes restantes: ${counter}'},
        ],
    });
} else {
    await maestro1.send({
        topic: 'venta',
        messages: [
            {value: 'Se acabaron los motes del maestro, usar otro.'},
        ],
    });
 }
    await maestro1.disconnect();
    
});

app.post("/compra_maestro2",async (req,res) =>{
    await maestro1.connect();
    if(motes2>0){
        motes2--;
    await maestro1.send({
        topic: 'venta',
        messages: [
            {value: 'Se ha comprado un mote, motes restantes: ${counter}'},
        ],
    });
} else {
    await maestro1.send({
        topic: 'venta',
        messages: [
            {value: 'Se acabaron los motes del maestro, usar otro.'},
        ],
    });
 }
    await maestro1.disconnect();
    
});

app.post("/compra_maestro3",async (req,res) =>{
    await maestro3.connect();
    if(motes3>0){
        motes3--;
    await maestro3.send({
        topic: 'venta',
        messages: [
            {value: 'Se ha comprado un mote, motes restantes: ${counter}'},
        ],
    });

} else {
    await maestro3.send({
        topic: 'venta',
        messages: [
            {value: 'Se acabaron los motes del maestro, usar otro.'},
        ],
    });
 }
    await maestro3.disconnect();
    
});

app.post("/compra_Paid_1",async (req,res) =>{
    await maestroP1.connect();
    if(motes4>0){
        motes4--;
    await maestroP1.send({
        topic: 'venta',
        messages: [
            {value: 'Se ha comprado un mote, motes restantes: ${counter}'},
        ],
    });
   
} else {
    await maestroP1.send({
        topic: 'venta',
        messages: [
            {value: 'Se acabaron los motes del maestro, usar otro.'},
        ],
    });
 }
    await maestroP1.disconnect();
    
});
app.post("/compra_Paid_2",async (req,res) =>{
    await maestroP2.connect();
    if(motes5>0){
        motes5--;
    await maestroP2.send({
        topic: 'venta',
        messages: [
            {value: 'Se ha comprado un mote, motes restantes: ${counter}'},
        ],
    });
    
} else {
    await maestroP2.send({
        topic: 'venta',
        messages: [
            {value: 'Se acabaron los motes del maestro, usar otro.'},
        ],
    });
 }
    await maestroP2.disconnect();
    
});

app.post("/refill_motes",async (req) =>{
    console.log('Se han comprado más motes')
    motes1=10;
    motes2=10;
    motes3=10;
    motes4=10;
    motes5=10;
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
    run();
});