import React from 'react';


export default function MessageTable({ messages }) {
  return (
        messages.map(message => {
            return (
                <tr key={message.id}>
                    <td>{message.username}</td>
                    <td>{message.message}</td>
                </tr>
            )
        })
  );
}
