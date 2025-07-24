import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

export default function ProductList({debouncedValue})  {
    const { isDarkTheme } = useContext(ThemeContext);
    // TODO: Exercice 2.1 - Utiliser le LanguageContext pour les traductions
    const { langue } = useContext(LanguageContext);

    const {
        products,
        loading,
        error,
        // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
        reloadProducts,
        // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
        currentPage,
        totalPages,
        nextPage,
        previousPage
    } = useProductSearch(debouncedValue);

    const getTranslations = () => {
        switch(langue) {
            case 'en':
                return {
                    loading: 'Loading...',
                    error: 'Error:',
                    price: 'Price:',
                    reload: 'Reload',
                    previous: 'Previous',
                    next: 'Next',
                    page: 'Page'
                };
            case 'ar':
                return {
                    loading: 'جاري التحميل...',
                    error: 'خطأ:',
                    price: 'السعر:',
                    reload: 'إعادة تحميل',
                    previous: 'السابق',
                    next: 'التالي',
                    page: 'صفحة'
                };
            default:
                return {
                    loading: 'Chargement...',
                    error: 'Erreur:',
                    price: 'Prix:',
                    reload: 'Recharger',
                    previous: 'Précédent',
                    next: 'Suivant',
                    page: 'Page'
                };
        }
    };

    const t = getTranslations();

    if (loading) return (
        <div className="text-center my-4">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">{t.loading}</span>
            </div>
            <p className="mt-2">{t.loading}</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger" role="alert">
            {t.error} {error}
        </div>
    );

    return (
        <div>
            {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
            <div className="mb-3">
                <button
                    onClick={reloadProducts}
                    className={`btn ${isDarkTheme ? 'btn-outline-light' : 'btn-outline-primary'}`}
                >
                    {t.reload}
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light border-secondary' : ''}`}>
                            {product.thumbnail && (
                                <img
                                    src={product.thumbnail}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">
                                    <strong>{t.price} </strong>
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={previousPage} disabled={currentPage === 1}>
                            {t.previous}
                        </button>
                    </li>
                    <li className="page-item">
                        <span className="page-link">{t.page} {currentPage} / {totalPages}</span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                            {t.next}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};