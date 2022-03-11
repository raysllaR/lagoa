/* eslint-disable react/destructuring-assignment */
import React from 'react';

function MessageError(error) {
  const { code, message, messageCode } = error.error;

  return (
    <div>
      <div>
        {code}
        :
        {' '}
        {message}
      </div>
      <div>
        {' '}
        {messageCode}
        {' '}
      </div>
    </div>
  );
}

export default MessageError;
