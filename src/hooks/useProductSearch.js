import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// TODO: Exercice 3.2 - Créer le hook useLocalStorage

 export const useLocalStorage = (key, initialValue) => {
  const [localValue, setLocalValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Erreur lors de la lecture du localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(localValue));
    } catch (error) {
      console.error("Erreur lors de l'écriture dans le localStorage", error);
    }
  }, [key, localValue]);

  return [localValue, setLocalValue];
}

const useProductSearch = (debouncedValue) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = async (page = 1, title = debouncedValue) => {
    setLoading(true);
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(`https://dummyjson.com/products/search?q=${title}&limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () => {
    fetchProducts(currentPage);
  };

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage
  };
};

export default useProductSearch;