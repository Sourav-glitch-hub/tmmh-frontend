import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <img
        src={product.image}
        className="h-40 w-full object-cover"
      />

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-blue-600 font-semibold">₹{product.price}</p>

      <Link
        to={`/product/${product._id}`}
        className="text-sm text-white bg-blue-500 px-3 py-1 rounded mt-2 inline-block"
      >
        View
      </Link>

    </div>
  );
}
