import { useState } from "react";

function Description({ Description,isExpanded }) {
    const formattedText = Description.replace(/\\n\\n/g, '\n\n');

    return (
        <>
            <div className="shadow-md rounded-2xl w-full bg-white border-1 border-gray-200 h-full">
                <div
                    className={`
                        transition-all duration-500 ease-in-out 
                        ${isExpanded ? 'max-h-[1000px]' : 'max-h-[303px]'} 
                        overflow-y-auto rounded-2xl h-full
                    `}
                >
                    <div className="p-6">
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
        </>
    );
}

export default Description;
