import { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 mb-4 text-sm border rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};
