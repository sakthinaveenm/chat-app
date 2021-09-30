import React from "react";
import "./Messages.css";

export default function Messages({ messages, user_id }) {
  return (
    <div className="container">
      {messages.map((message, i) => {
        return (
          <>
            {messages.user_id === user_id ? (
              <div className="message-orange" key={messages._id}>
                <p className="message-content">{messages.text}</p>
              </div>
            ) : (
              <div className="message-blue" key={messages._id}>
                <p className="message-content">{messages.text}</p>
                {/* <div className="message-timestamp-left">SMS 13:37</div> */}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
