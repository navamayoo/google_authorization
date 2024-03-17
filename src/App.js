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
  const [user, setUser] = useState({});
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handelLogout = () => {
    googleLogout();
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const handelLogin = async (googleData) => {
    const userData = jwtDecode(googleData);
    // setUser(userData);
    console.log(userData);
    console.log("googleData>>>>", googleData);

    // const res = await axios
    // .post("http://localhost:5000/api/student", formData)
    // .then((res) => {
    //   console.log("crete");
    //   setFormData(initialValues);
    // })

    try {
      const res = await fetch("http://localhost:5000/api/google-login", {
        method: "POST",
        body: JSON.stringify({
          token: googleData,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to log in with Google");
      }

      const data = await res.json();
      setLoginData(data);
      localStorage.setItem("loginData", JSON.stringify(data));
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <p>React OAuth2 | Auth0 Google Authentication</p>
        {loginData ? (
          <>
            <div>
              <img src={user.picture} alt={user.name} />
              <h3>{user.name}</h3>
            </div>
            <div>
              <button onClick={handelLogout}>Logout</button>
            </div>
          </>
        ) : (
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handelLogin(credentialResponse.credential);
              }}
              onError={() => {
                googleLogout();
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </div>
  );
}

export default App;
