import './App.css';
//import dependencies
import axios from 'axios'
import {Routes, Route} from 'react-router-dom'
//import react components
import Layout from './components/Layout';
import Index from './components/pages/Main'
import Rent from './components/pages/Rent'
import Hotel from './components/pages/Hotel'
import HomeStay from './components/pages/HomeStay'
import Pg from './components/pages/Pg'
import Hostel from './components/pages/Hostel'
import Login from './components/auth/Login'
import WishList from './components/auth/Wishlist';
import NestYourHome from './components/auth/NestYourHome';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import DescribeYourHome from './add-accomodation-pages/DescribeYourHome';
import AddAccomodationLayout from './add-accomodation-pages/AddAccomodationLayout'
import Location from './add-accomodation-pages/Location';
import Details from './add-accomodation-pages/Details';
import Photos from './add-accomodation-pages/Photos';
import Amenities from './add-accomodation-pages/Amenities';
import MyPlace from './components/place/MyPlace';
import Place from './components/place/Place'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public route */}
          <Route element={<PersistLogin/>}>
            <Route index element={<Index/>}/>
            <Route path='/rent' element={<Rent/>}/>
            <Route path='/hotel' element={<Hotel/>}/>
            <Route path='/homestay' element={<HomeStay/>}/>
            <Route path='/pg' element={<Pg/>}/>
            <Route path='/hostel' element={<Hostel/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/place/:id' element={<Place/>}/>
          
          {/* login required and roles*/}

            <Route element={<RequireAuth allowedRoles={['user', 'editor', 'admin', 'god']}/>}>
              <Route path='/nestyourhome' element={<NestYourHome/>}/>
              <Route path='/wishlist' element={<WishList/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/myplace/:id' element={<MyPlace/>}/>
            </Route>{/*end: roles */}
          </Route>{/* end: persit login*/}
        </Route>{/* end: main layout */}
        
          <Route element={<PersistLogin/>}>
            <Route element={< AddAccomodationLayout/>}>
                <Route path='/nestyourhome/addaccomodation' element={<DescribeYourHome/>}/>
                <Route path='/nestyourhome/updateplace/:id' element={<DescribeYourHome/>}/>
                <Route path='/nestyourhome/location' element={<Location/>}/>
                <Route path='/nestyourhome/details' element={<Details/>}/>
                <Route path='/nestyourhome/photos' element={<Photos/>}/>
                <Route path='/nestyourhome/amenities' element={<Amenities/>}/>
            </Route> {/* end: /nestyourhome */}
          </Route>{/* end: persit login*/}
      </Routes>
    </>
  );
}

export default App;