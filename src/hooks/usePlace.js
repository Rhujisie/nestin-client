import { useContext } from "react";
import { PlaceContext } from "../context/PlaceProvider";

export default function usePlace(){
    return useContext(PlaceContext)
}