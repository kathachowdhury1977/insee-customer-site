import React from 'react';
import {Chatbot} from 'react-chatbot-kit';
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";


// https://fredrikoseberg.github.io/react-chatbot-kit-docs/

const ChatBot = (props) => {
    return (
         <>
         <Chatbot  config ={config} actionProvider={ActionProvider} messageParser={MessageParser}  />
         </>
    );
}

export default ChatBot;