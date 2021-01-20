import { io } from 'socket.io-client';

export const socket = io('localhost:3000');

socket.on('test',()=>{
    console.log('test');
})

socket.on('welcome',(args)=>{
    console.log(args)
});

socket.on('getPosition',(res)=>{
    console.log(res);
});