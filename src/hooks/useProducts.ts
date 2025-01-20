import { useState, useEffect } from "react";
import { Product } from "../types";

export interface FilterState {
  filterByCategory: string[];
  filterByRating: number | null;
  filterByPriceSort: "asc" | "desc" | "";
  filterByPriceRange: [number, number];
  filterBySize: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;
  const [filters, setFilters] = useState<FilterState>({
    filterByCategory: [],
    filterByRating: 0,
    filterByPriceSort: "",
    filterByPriceRange: [0, 1810],
    filterBySize: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/c/c141-deef-41bb-be33"
        );
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter((product) => {
      const { price, category, rating, size } = product;
      return (
        price >= filters.filterByPriceRange[0] &&
        price <= filters.filterByPriceRange[1] &&
        (filters.filterByCategory.length === 0 ||
          filters.filterByCategory.includes(category)) &&
        (filters.filterByRating === null ||
          parseFloat(rating) >= filters.filterByRating) &&
        (filters.filterBySize.length === 0 ||
          filters.filterBySize.includes(size))
      );
    })
    .sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return filters.filterByPriceSort === "asc"
        ? priceA - priceB
        : priceB - priceA;
    });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return {
    products: currentProducts,
    allProducts: products,
    categories,
    isLoading,
    filters,
    setFilters,
    error,
    pagination: {
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      goToPage,
    },
  };
};
