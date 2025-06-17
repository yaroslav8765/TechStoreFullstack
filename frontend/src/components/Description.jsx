
function Description({ Description }) {
    const formattedText = Description.replace(/\\n\\n/g, '\n\n');

    return (
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
    );
}


export default Description;
