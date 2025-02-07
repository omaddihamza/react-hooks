import React, { useContext, useRef } from 'react'
import { LanguageContext } from '../App';

export default function LangueSelectore() {

const {setLangue} = useContext(LanguageContext);
  return (
    <select  onChange={(e)=>setLangue(e.target.value)}>
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
    </select>
  )
}
