import logo from "./logo.svg";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token ", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "796258526950-g6dlvtvba6nn5abd5o3p0jupua3vs01b.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);
  // If we have no user: sign in button
  // If we have a user: show the log out button
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt="img"></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
