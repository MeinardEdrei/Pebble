import React from 'react'
import './App.css'
import Home from './components/Home'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <button className='text-white font-bold p-2 rounded-xl' style={{backgroundColor: '#ff8906'}} onClick={() => loginWithRedirect()}>Log In</button>;
}

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button className='text-white font-bold p-2 rounded-xl' style={{backgroundColor: '#ff8906'}} onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
}

const App = () => {
  return (
    <div>
      <Auth0Provider
        domain="dev-li6a212imhcsv22q.us.auth0.com"
        clientId="pU2NTaG1rp7DCd8XDqecCbke8G9hW0ZP"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <div>
          <div className='flex justify-end gap-5 m-10'>
            <LoginButton />
            <LogoutButton />
          </div>
          <Home />
        </div>
      </Auth0Provider>
    </div>
  )
}

export default App
