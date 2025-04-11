// File: src/components/ProductList.jsx

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-black font-bold text-lg">₹{product.price}</p>
            <p className="text-sm text-gray-500">
              {product.outOfStock
                ? "Out of Stock"
                : `In Stock: ${product.stockQuantity}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
