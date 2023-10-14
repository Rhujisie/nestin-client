import { createContext, useState } from "react";
export const PlaceContext = createContext()

export default function PlaceProvider({children}){
    const [place, setPlace] = useState({
        name: '', description: '', type: '',district:'', city: '', 
        address: '', landmark: '',bedroom: 1, livingroom: 1, kitchen: 1,
        washroom: 1, photos: [], amenities: [], price: 0, deposit: 0,
    })

    return(
        <PlaceContext.Provider value={{place, setPlace}}>
            {children}
        </PlaceContext.Provider>
    )
}