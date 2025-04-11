// src/components/FilterSidebar.jsx
export default function FilterSidebar({ filters, setFilters }) {
  return (
    <div className="w-64 border-r p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block mb-1">Category</label>
        <input
          type="text"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full border rounded p-2"
          placeholder="T-shirt, hoodie..."
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Max Price</label>
        <input
          type="number"
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: parseInt(e.target.value) })
          }
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={filters.available}
          onChange={() =>
            setFilters({ ...filters, available: !filters.available })
          }
          className="mr-2"
        />
        <label>In Stock Only</label>
      </div>
    </div>
  );
}
