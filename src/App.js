import "./App.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  //const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState({});

  console.log("CLIENT_ID>>>>", CLIENT_ID);

  const getGoogleCredential = (credential) => {
    const userData = jwtDecode(credential);
    setUser(userData);
    console.log(userData);
    //document.getElementById("signInDiv").hidden = true;
  };

  googleLogout();
  return (
    <div className="App">
      <div className="App-header">
        <p>React OAuth2 | Auth0 Google Authentication</p>
        {user && (
          <>
                    <div>
            <img src={user.picture} alt={user.name} />
            <h3>{user.name}</h3>
          </div>
          </>

        )}

        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              getGoogleCredential(credentialResponse.credential);
            }}
            onError={() => {
              googleLogout();
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
