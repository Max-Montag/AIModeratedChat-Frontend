import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatRoom chatRoomId={"1"} />
      </header>
    </div>
  );
}

export default App;
