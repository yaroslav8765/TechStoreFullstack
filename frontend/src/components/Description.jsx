import { useState } from "react";

function Description({ Description }) {
    const formattedText = Description.replace(/\\n\\n/g, '\n\n');
    const [isExpanded,  setIsExpanded] = useState(true);
    const [containerHeight, setContainerHeight] = useState(800);
    
    async function expandHandler() {
        isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    } 
    return <>



        <div className={` overflow-y-auto max-h-[300px]`} >
            <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{
                maxHeight: isExpanded ? `${containerHeight}px` : '0px',
            }}
            >

                
            <div className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mt-8 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Product Description
                </h2>
                {formattedText.split('\n\n').map((paragraph, idx) => (
                    <p
                        key={idx}
                        className="text-gray-700 leading-relaxed text-base mb-4 whitespace-pre-line"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>


            </div>
        </div>






















        {/* <div className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mt-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Product Description
            </h2>
            {formattedText.split('\n\n').map((paragraph, idx) => (
                <p
                    key={idx}
                    className="text-gray-700 leading-relaxed text-base mb-4 whitespace-pre-line"
                >
                    {paragraph}
                </p>
            ))}
        </div> */}
    </>
}


export default Description;
