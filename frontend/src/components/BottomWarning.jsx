import { Link } from "react-router-dom"

export const BottomWarning=({line,label,to})=>{
    return(
        <div className="flex pt-3 justify-center">
            <div className="pr-1 font-medium">
            {line} 
            </div>
            <div className="underline font-medium"> 
                <Link to={to}>{label}</Link>
            </div>
        </div>
    )
}