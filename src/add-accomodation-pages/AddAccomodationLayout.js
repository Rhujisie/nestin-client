import { Outlet } from "react-router-dom"
import AddAccomodationNav from "./AddAccomodationNav"
import AddAccomodationFooter from "./AddAccomodationFooter"
import Completion from "./Completion"
import { useState } from "react"

export default function AddAccomodationLayout(){
    const [completion, setCompletion] = useState(0)
    return<>
        <AddAccomodationNav/>
        <div className="accomodation-outlet">
            <Outlet context={[completion, setCompletion]}/>
        </div>
        <Completion completion={completion}/>
        <AddAccomodationFooter/>
    </>
}