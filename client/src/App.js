import React, { useState, useRef, useEffect } from 'react';
import MessageTable from "./MessageTable";
import SelectOptions from "./SelectOptions";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [messages, newMessage] = useState([]);
  const usna = useRef();
  const mesa = useRef();

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        data.forEach(obj => {
          let iid = "";
          let user = "";
          let mes = "";
          Object.entries(obj).forEach(([key, value]) => {
            if (key === "id") {
              iid = value;
            }
            if (key === "username") {
              user = value;
            }
            if (key === "message") {
              mes = value;
            }
          })
          console.log(iid, user, mes)
          newMessage(existMessages => {
            return [...existMessages, { id: iid, username: user, message: mes }]
          })
        })
      })
  }, []);

  let initial = useRef(true);
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
    } else {
      fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(messages)
      })
    }
  }, [messages]);

  function sndMsg(e) {
    const usr = usna.current.value;
    const mesag = mesa.current.value;
    if (usr === "") return
    if (mesag === "") return
    newMessage(existMessages => {
      return [...existMessages, { id: uuidv4(), username: usr, message: mesag }]
    })
    usna.current.value = null;
    mesa.current.value = null;
  }

  const unames = []
  messages.map(usernames => {
    unames.push(usernames.username)
  })
  const uniq = Array.from(new Set(unames));

  return (
    <>
      <input ref={usna} type="text" placeholder="Username" id="usrn" />
      <input ref={mesa} type="text" placeholder="Message" id="msg" />
      <button onClick={sndMsg}>Send message</button><br/>
      <select>
        <option hidden>Sort by user..</option>
        <SelectOptions uniq={uniq}/>
      </select>
      <table id="gulist">
        <tbody>
          <tr>
            <th id="usna">Username</th>
            <th id="mesag">Message</th>
          </tr>
          <MessageTable messages={messages}/>
        </tbody>
      </table>
    </>
  );
}

export default App;
