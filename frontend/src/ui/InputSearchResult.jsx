


function InputSearchResult({value, onClick}){


    return <div onClick={onClick} className="text-gray-600 font-bold text-md bg-gray-50 hover:bg-gray-100 p-2 w-full max-w-[220px]"> 
        <p>{value}</p>
    </div>
}

export default InputSearchResult;