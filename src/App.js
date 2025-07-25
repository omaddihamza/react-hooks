import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LangueSelectore from './components/LangueSelectore';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();

export const ThemeContext = createContext();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // TODO: Exercice 2.2 - Ajouter l'état pour la langue
    const [langue, setLangue] = useState("fr");
    const [debouncedValue, setDebouncedValue] = useState('');


    const getTitle = () => {
        switch(langue) {
            case 'en': return 'Product Catalog';
            case 'ar': return 'كتالوج المنتجات';
            default: return 'Catalogue de Produits';
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
            {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
            <LanguageContext.Provider value={{ langue, setLangue }}>
                <div className={`container-fluid min-vh-100 ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
                    <div className="container py-4">
                        <header className="mb-4">
                            <h1 className="text-center mb-4">{getTitle()}</h1>
                            <div className="d-flex justify-content-end align-items-center gap-2">
                                <ThemeToggle />
                                {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
                                <LangueSelectore />
                            </div>
                        </header>
                        <main>
                            <ProductSearch onDebouncedChange={setDebouncedValue}/>
                            <ProductList debouncedValue={debouncedValue} />
                        </main>
                    </div>
                </div>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
