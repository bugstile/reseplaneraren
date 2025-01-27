import { useState } from 'react';

function InputDate({ label, value, onChange }) {
  return (
    <>
      {label && <label className="input-label">{label}</label>}
      <input
        type="date"
        className="input input-date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default InputDate;