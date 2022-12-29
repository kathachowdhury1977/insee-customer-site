// Config starter code
import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "../../../components/BotAvatar/BotAvatar";
import Todos from '../../../components/Todos/Todos';

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: "INSEE Chat",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />
  },

  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#ff0000",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#ff0000",
    },
  },

  state: {
    todos: [] 
  },
  widgets: [
    {
      widgetName: "todos",
      widgetFunc: (props) => <Todos {...props} />,
      mapStateToProps: ["todos"],
    }
  ]
}


export default config