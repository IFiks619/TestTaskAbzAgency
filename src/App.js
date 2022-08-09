import React, { useState } from "react";
import Form from "./components/form";


import Header from "./components/header";
import InfoBlock from "./components/infoBlock";
import UsersBlock from "./components/usersBlock";
import "./scss/app.scss";

function App() {
  const [newUserRegistrated, setNewUserRegistrated] = useState(false)

  return (
    <div className="App">
      <Header />
      <InfoBlock />
      <h2 className="title">Working with GET request</h2>
      <UsersBlock newUserRegistrated={newUserRegistrated} setNewUserRegistrated={setNewUserRegistrated} />
      <Form setNewUserRegistrated={setNewUserRegistrated}/>
    </div>
  );
}

export default App;
