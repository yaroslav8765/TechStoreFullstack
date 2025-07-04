import { useState, useRef, useEffect } from "react";

function CharacteristicsTable({ characteristics, isExpanded, expandFunction}) {
    const [height, setHeight] = useState("0px");
    const contentRef = useRef(null);

    const excludeKeys = ['id', 'goods_id'];

    const entries = Object.entries(characteristics).filter(
        ([key]) => !excludeKeys.includes(key)
    );

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "140px");
        }
    }, [isExpanded]);

    const formatKey = (key) => {
        return key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="bg-white shadow-md rounded-2xl w-full p-6 mx-auto  overflow-hidden border-1 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Technical Specifications
            </h2>

            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className="transition-all duration-800 ease-in-out overflow-hidden"
            >
                <table className="min-w-full text-sm text-left text-gray-700">
                    <tbody>
                        {entries.map(([key, value]) => (
                            <tr key={key} className="border-b last:border-none">
                                <td className="py-2 pr-4 font-medium text-gray-800 whitespace-nowrap">
                                    {formatKey(key)}
                                </td>
                                <td className="py-2 text-gray-600">
                                    {value === true ? 'Yes' : value === false ? 'No' : value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={expandFunction}
                    className="text-gray-600 border px-12 py-2 rounded-4xl hover:underline hover:border-gray-900 hover:bg-gray-100 focus:outline-none transition-all duration-200"
                >
                    {isExpanded ? "Show Less ▲" : "Show More ▼"}
                </button>
            </div>
        </div>
    );
}

export default CharacteristicsTable;
