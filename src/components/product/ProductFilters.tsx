import { Filter, X } from "lucide-react";
import { FilterState } from "../../hooks/useProducts";

interface ProductFiltersProps {
  categories: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      filterByCategory: filters.filterByCategory.includes(category)
        ? filters.filterByCategory.filter((item: string) => item !== category)
        : [...filters.filterByCategory, category],
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onFilterChange({
      ...filters,
      filterByPriceRange: [0, value],
    });
  };

  const handlePriceSort = (sort: "asc" | "desc") => {
    onFilterChange({
      ...filters,
      filterByPriceSort: sort,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      filterByRating: rating,
    });
  };

  const handleSizeChange = (size: string) => {
    onFilterChange({
      ...filters,
      filterBySize: filters.filterBySize.includes(size)
        ? filters.filterBySize.filter((item: string) => item !== size)
        : [...filters.filterBySize, size],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.filterByCategory.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort by Price</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.filterByPriceSort === "asc"}
              onChange={() => handlePriceSort("asc")}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">Low to High</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.filterByPriceSort === "desc"}
              onChange={() => handlePriceSort("desc")}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">High to Low</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-2">
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.filterBySize.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">{size}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.filterByRating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <span className="ml-2">{rating} stars & above</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <input
          type="range"
          min={0}
          max={1810}
          step={10}
          value={filters.filterByPriceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹{filters.filterByPriceRange[0]}</span>
          <span>₹{filters.filterByPriceRange[1]}</span>
        </div>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilters;
