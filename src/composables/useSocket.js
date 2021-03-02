import { io } from 'socket.io-client';

export const socket = io('localhost:3000');

socket.on('welcome',(args)=>{
    console.log(args)
});

socket.on('getPosition',(id,long,lat)=>{
    console.log(id+' : '+long+','+lat);
});