import * as React from 'react';

interface Props {
  name?: string;
  placeholder?: string;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.SFC<Props> = ({ name, placeholder, value, handleOnChange }: Props) => (
  <input 
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={handleOnChange}
  />
);