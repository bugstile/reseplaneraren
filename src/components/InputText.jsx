import { useState } from 'react';

function InputText({ label, value, onChange }) {
  return (
    <>
      {label && <label className="input-label">{label}</label>}
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default InputText;