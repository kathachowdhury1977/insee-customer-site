// ActionProvider starter code
class ActionProvider {
    // createClientMessage
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    //   this.createClientMessage = createClientMessage;
    }

    helloWorldHandler = () => {
        const message = this.createChatBotMessage("Hello. i am not self aware. Luckily!")
        this.setChatbotMessage(message)
    }

    todosHandler = () => {
        const message = this.createChatBotMessage("Sure. Here's your todos.", {
            widget: "todos"
        })
        this.setChatbotMessage(message)
    }

    setChatbotMessage = (message) => {
        this.setState(state => ({...state, messages: [...state.messages, message] }))
    }
  }
  
  export default ActionProvider;