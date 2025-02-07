import React, { useState, useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import { useDebounce } from 'use-debounce';


const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const {langue} = useContext(LanguageContext);
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;