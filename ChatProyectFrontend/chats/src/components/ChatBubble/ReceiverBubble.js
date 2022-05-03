import './index.css';

function ReceiverBubble ({message}) {
    return(
      <div className="chat_bubble_container">
              <p>{message.message}</p>
      </div>  
    );
}

export { ReceiverBubble };