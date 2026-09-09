// src/MyApp.jsx
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
    function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((response) => response.json())
      .then((users) => setCharacters(users))
      .catch((error) => console.error(error));
  }, []);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
