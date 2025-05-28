import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ChipInput = ({ value, onChange, placeholder, error }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (newSkill && !value.includes(newSkill)) {
        onChange([...value, newSkill]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleDelete = (skillToDelete) => {
    onChange(value.filter(skill => skill !== skillToDelete));
  };

  return (
    <div className="w-full">
      <div 
        className={`flex flex-wrap gap-2 p-2 border rounded-lg bg-white min-h-[42px] ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {value.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1 px-2 py-1 bg-[#7AC64D] bg-opacity-10 text-[#7AC64D] rounded"
          >
            <span className="text-sm">{skill}</span>
            <button
              type="button"
              onClick={() => handleDelete(skill)}
              className="text-[#7AC64D] hover:text-[#68b340] focus:outline-none"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-grow outline-none text-sm min-w-[120px] bg-transparent"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

ChipInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

ChipInput.defaultProps = {
  placeholder: 'Type and press Enter',
};

export default ChipInput; 