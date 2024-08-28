
export const InputBox = ({info , placeholder, onChange})=>{
    return (
        <div className="pr-3 pl-3">
            <div className="font-semibold text-sm pt-6">
            {info} 
            </div>
            <div>
            <input type="text" className=" w-full h-10 border rounded border-slate-200 font-light text-sm pl-2 pb-1" placeholder={placeholder} onChange={onChange}></input>
            </div>
        </div>
    )
}