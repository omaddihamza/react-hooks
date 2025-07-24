import React, { useContext } from 'react';
import { LanguageContext } from '../App';

export default function  LangueSelectore()  {
    const { setLangue } = useContext(LanguageContext);

    return (
        <select
            onChange={(e) => setLangue(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
        >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
        </select>
    );
}
