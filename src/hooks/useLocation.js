import { useContext } from 'react'
import {LocationContext} from '../context/locationProvider'

export default function useLocation() {
  return useContext(LocationContext)
}
