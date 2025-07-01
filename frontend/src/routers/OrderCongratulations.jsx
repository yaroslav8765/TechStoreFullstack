import { useParams, useNavigate } from "react-router-dom";

function OrderCongratulations() {
  const { order_number } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">
        Thank you for your order!
      </h1>
      <p className="text-lg text-gray-800 mb-6">
        Your order number is <span className="font-semibold">{order_number}</span>.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 gradient-btn-green text-white rounded-lg "
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderCongratulations;
