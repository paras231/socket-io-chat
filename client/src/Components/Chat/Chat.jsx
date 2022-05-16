import React,{useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ENDPOINT = "http://localhost:5000";
let socket;

const Chat = () => {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

const location = useLocation();
  useEffect(()=>{
    const {name,room} = queryString.parse(location.search);
  socket = io(ENDPOINT,{transports:['websocket']});
    setName(name);
    setRoom(room);
    console.log(socket);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

  

  },[location.search]);


  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  return (
   <>
   <h1>Chat</h1>
   </>
  )
}

export default Chat