import { io } from 'socket.io-client';
import { addr } from '@/composables/mongoApi';

export const socket = io(addr);

socket.on('welcome',(args)=>{
    console.log(args)
});

socket.on('getPosition',(id,long,lat)=>{
    console.log(id+' : '+long+','+lat);
});