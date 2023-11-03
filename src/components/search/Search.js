import { useState } from 'react'
import '../search/Search.css'
import PinLogo from '../../icon/pin.gif'
import useLocation from '../../hooks/useLocation'

const city = ["Kohima", "Dimapur", "Wokha", "Meluri", "Phek", "Kiipheri",
 "Chumu", "Kalukie", "Lephori", "Peren", "Neiland", "Visema"]

export default function Search({search ,setSearch}) {
    const [isHidden, setIsHidden] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const {setLocation} = useLocation()

    const resultElem = city.map((data)=>{
        if(data.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())){
            return <div key={data} onClick={(e)=>handleClick(e, data)}>{data}</div>
        }
    })
    const handleClick=(e, data)=>{
        setIsHidden(true)
        setSearchResult(true)
        setSearch(data)
        setLocation(data)
    }
    const handleChange=(e)=>{
        setIsHidden(false)
        setSearchResult(false)
        setSearch(e.target.value)
    }
  return (
    <div className='search'>
        <input placeholder='Search...'
            value={search} onChange={(e)=>handleChange(e)}/>
        <label className='location-logo' htmlFor='location'>
            <img src={PinLogo} alt='pin' className='pin-logo'/>
        </label>
        {search && <p className={`para search-para ${isHidden? 'hidden': ''}`}>Select location from the option</p>}
        {search && <div className={`search-result-container 
            ${searchResult? 'hidden': ''}`}>
            {resultElem}
        </div>}
    </div>
  )
}