
import './App.css';
import { GoogleOAuthProvider, GoogleLogin  } from '@react-oauth/google';

function App() {

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  console.log("CLIENT_ID>>>>", CLIENT_ID)

  return (
    <div className="App">
      <div className="App-header">
        <p>
        React OAuth2 |  Auth0 Google Authentication
        </p>
        <GoogleOAuthProvider clientId={CLIENT_ID} >
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
          </GoogleOAuthProvider>;
      </div>
    </div>
  );
}

export default App;
