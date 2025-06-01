

function LoadingAnimation(){
    return<div className="flex items-center justify-center">
        <button type="button" className="inline-flex cursor-not-allowed items-center rounded-md bg-gray-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out" disabled="">
            <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Processing…
        </button>
    </div>
}

export default LoadingAnimation;