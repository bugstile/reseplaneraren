// Input.jsx
import React from 'react';

function Input({ label, value, onChange, type }) {
  return (
    <>
      {label && <label className="input-label">{label}</label>}
      
      <input
        type={type}
        className={`input ${type === 'date' ? 'input-date' : ''}`} 
        value={value}
        onChange={(e) => onChange(e.target.value)} 
      />
    </>
  );
}

export default Input;