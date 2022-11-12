import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const ChatRoom = ({username,receivername}) => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('https://stomp-chat-backend.herokuapp.com/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container flex items-center justify-center w-screen m-auto md:mt-20 ">
        {userData.connected?
        <div className="chat-box flex  md:grid md:grid-cols-3 md:grid-rows-1  bg-white  m-auto rounded-3xl p-2">
            <div className="member-list flex col-span-1 p-2 text-sm">
                <ul><li className='mb-16'><label className='input-label text-lg'>Chats:</label></li>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`border-t-[1px]  p-2 my-2 button text-center  member ${tab==="CHATROOM" && "active"}`}>Public</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`border-t-[1px]  text-center p-2 my-2  member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content flex flex-col col-span-2 justify-between border-l-2 h-96 p-2">
                <ul className="chat-messages flex flex-col font-light text-xs space-y-4 ">
                    {publicChats.map((chat,index)=>(
                        <li className={`flex flex-col rounded-full p-2 px-4  ${(chat.senderName == userData.username)?"bg-gray-100 ml-36 items-right":" bg-green-100 mr-36 -left"} message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar font-normal text-teal-700 p-1">{chat.senderName} :</div>}
                            {chat.senderName === userData.username && <div className="avatar font-normal text-violet-700 self p-1">{chat.senderName} :</div>}
                            <div className="message-data">{chat.message}</div>
                        </li>
                    ))}
                </ul>

                <div className="send-message flex mx-auto text-gray-800">
                    <input type="text" className="border-b-2 px-2 input-bordered leading-tight focus:outline-none focus:shadow-outline" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button border-0  btn" onClick={sendValue}>send  <svg className='ml-1' width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content flex flex-col justify-between border-l-2 md:-ml-10 h-96 p-2 rounded-xl bg-green-200">
                <ul className="chat-messages flex flex-col text-md w-64">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                        </li>
                    ))}
                </ul>

                <div className="send-message flex mx-auto text-gray-800">
                    <input type="text" className="border-b-2 px-2 input-bordered leading-tight focus:outline-none focus:shadow-outline" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button border-0  btn" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register bg-white p-4 rounded-xl">
            <input
                className='h-full leading-tight focus:outline-none focus:shadow-outline'
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button className=' ml-4 btn' type="button" onClick={registerUser}>
                 <div className=''> connect </div>
               </button> 
        </div>}
    </div>
    )
}

export default ChatRoom
