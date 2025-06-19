

function PagginationButton({mode, onClick}){

    return <>
            <button 
            className={`bg-gray-400 mt-2 rounded-md w-[40px] h-[40px] ${mode==="right"?"gradient-btn-green":"gradient-btn-red"}`}
            onClick={onClick}>
            {mode==="right"?">":"<"}
            </button>
    </>
}

export default PagginationButton