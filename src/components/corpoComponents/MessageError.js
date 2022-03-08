import React from 'react';

const MessageError = (error) => {
  const {code, message, messageCode} = error.error;

  return (
    <div>
        <div>{code}: {message}</div>
        <div> {messageCode} </div>
    </div>
  )
}

export default MessageError;