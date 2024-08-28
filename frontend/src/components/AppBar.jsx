
export const AppBar=({user})=>{
    return (
        <div className='shadow-md'>
          <div className='flex justify-between '>
          <div class=" flex flex-col justify-center items-center">
          <div className=" pl-5 p-2 text-2xl font-semibold">
            PayTM App
          </div>
        </div>
        
        <div class=" flex flex-col justify-center items-center">
        <div className='flex pr-5'>
        <div className="text-lg p-2 ">
          hello , {user}
        </div>
        <div className='pl-1  w-12 '>
         <div className=" p-2 rounded-full  pl-3 bg-slate-200 text-lg">
          <div className='text-center  pr-0.5'>{user.toUpperCase().charAt(0)}</div>
        </div>
        </div>
        </div>
      </div>
        </div>
        </div>
      )
}