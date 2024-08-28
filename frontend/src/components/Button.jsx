
export const Button=({label , onClick})=>{
    return (
        <>
        <div className="pt-7 pr-3 pl-3 "> 
        <button className="border pb-0.5 bg-black border rounded-lg text-white w-full h-10" onClick={onClick}> 
            {label}
        </button>
        </div>
        </>
    )
}