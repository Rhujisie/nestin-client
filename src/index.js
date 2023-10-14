import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/AuthProvider'
import UserProvider from './context/UserProvider'
import PlaceProvider from './context/PlaceProvider';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <PlaceProvider>
            <App />
          </PlaceProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  //</React.StrictMode>
);


