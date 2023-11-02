import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/AuthProvider'
import UserProvider from './context/UserProvider'
import PlaceProvider from './context/PlaceProvider';
import {LocationProvider} from './context/locationProvider';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production'){
  console.log('production', process.env.PUBLIC_URL)
  disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UserProvider>
        <AuthProvider>
          <PlaceProvider>
            <LocationProvider>
              <App />
            </LocationProvider>
          </PlaceProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


