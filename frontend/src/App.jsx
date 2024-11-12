import React from 'react'
import './App.css'
import Home from './components/Home'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const App = () => {
  return (
    <div>
      <Auth0Provider
        domain="dev-li6a212imhcsv22q.us.auth0.com"
        clientId="pU2NTaG1rp7DCd8XDqecCbke8G9hW0ZP"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <div>
          <Home />
        </div>
      </Auth0Provider>
    </div>
  )
}

export default App
