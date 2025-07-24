import React, {useState, useContext, useEffect} from 'react';
import { LanguageContext, ThemeContext } from '../App';
import { useDebounce } from '../hooks/useProductSearch';

export default function ProductSearch({ onDebouncedChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);
    // TODO: Exercice 2.1 - Utiliser le LanguageContext
    const { langue } = useContext(LanguageContext);
    // TODO: Exercice 1.2 - Utiliser le hook useDebounce
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const getPlaceholder = () => {
        switch(langue) {
            case 'en': return 'Search for a product...';
            case 'ar': return 'البحث عن منتج...';
            default: return 'Rechercher un produit...';
        }
    };

    useEffect(() => {
        if (onDebouncedChange) {
            onDebouncedChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onDebouncedChange]);

    return (
        <div className="mb-4">
            <input type="text" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={getPlaceholder()}
                className={`form-control ${isDarkTheme ? 'bg-dark text-light border-secondary' : ''}`}
            />
            {debouncedSearchTerm && (<small className="text-muted">Recherche: {debouncedSearchTerm}</small>
            )}
        </div>
    );
};
