import './App.css';
//import dependencies
import {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
//import react components
import Loader from './components/Loader'
import Layout from './components/Layout'

const Index = lazy(()=> import('./components/pages/Main'))
const Rent = lazy(()=> import('./components/pages/Rent'))
const Hotel = lazy(()=> import('./components/pages/Hotel'))
const HomeStay = lazy(()=> import('./components/pages/HomeStay'))
const Pg = lazy(()=> import('./components/pages/Pg'))
const Hostel = lazy(()=> import('./components/pages/Hostel'))

const Login = lazy(()=> import('./components/auth/Login'))
const Register = lazy(()=> import('./components/auth/Register'))
const Recovery = lazy(()=> import('./components/auth/Recovery'))
const ResetPassword = lazy(()=> import('./components/auth/ResetPassword'))

const WishList = lazy(()=> import('./components/auth/Wishlist'))
const NestYourHome = lazy(()=> import('./components/auth/NestYourHome'))

const Profile = lazy(()=> import('./components/auth/Profile'))
const RequireAuth = lazy(()=> import('./components/auth/RequireAuth'))
const PersistLogin = lazy(()=> import('./components/auth/PersistLogin'))
const DescribeYourHome = lazy(()=> import('./add-accomodation-pages/DescribeYourHome'))
const AddAccomodationLayout = lazy(()=>  import('./add-accomodation-pages/AddAccomodationLayout'))
const Location = lazy(()=> import('./add-accomodation-pages/Location'))
const Details = lazy(()=>  import('./add-accomodation-pages/Details'))
const Photos = lazy(()=> import('./add-accomodation-pages/Photos'))
const Amenities = lazy(()=>  import('./add-accomodation-pages/Amenities'))
const MyPlace = lazy(()=>  import('./components/place/MyPlace'))
const Place = lazy(()=> import('./components/place/Place'))

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public route */}
      <Suspense fallback={<Loader/>}>
          <Route element={<PersistLogin/>}>
            <Route index element={<Index/>}/>
            <Route path='/rent' element={<Rent/>}/>
            <Route path='/hotel' element={<Hotel/>}/>
            <Route path='/homestay' element={<HomeStay/>}/>
            <Route path='/pg' element={<Pg/>}/>
            <Route path='/hostel' element={<Hostel/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/recovery' element={<Recovery/>}/>
            <Route path='/reset' element={<ResetPassword/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/place/:id' element={<Place/>}/>
          {/* <Route element={<PersistLogin/>}>
            <Route index element={<Index/>}/>
            <Route path='/rent' element={<Rent/>}/>
            <Route path='/hotel' element={<Hotel/>}/>
            <Route path='/homestay' element={<HomeStay/>}/>
            <Route path='/pg' element={<Pg/>}/>
            <Route path='/hostel' element={<Hostel/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/place/:id' element={<Place/>}/>
          </Route>end: persit login */}
          
          {/* login required and roles*/}
            <Route element={<RequireAuth allowedRoles={['user', 'editor', 'admin', 'god']}/>}>
              <Route path='/nestyourhome' element={<NestYourHome/>}/>
              <Route path='/wishlist' element={<WishList/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/myplace/:id' element={<MyPlace/>}/>
            </Route>{/*end: roles */}
            </Route>{/* end: persit login*/}
          </Suspense>
        </Route>{/* end: main layout */}

        <Suspense fallback={<Loader/>}>
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
        </Suspense>
      </Routes>
    </>
  );
}

export default App;
