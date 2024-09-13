import { useState } from 'react';

import { Arrow, Cross } from '../icons';

export type ComboboxListItem = { label?: string; value: string };

type Props = {
  name: string;
  list: ComboboxListItem[] | undefined;
  initialValue?: string; // TODO generic
  placeholder?: string;
  onInputChange: (value: string) => void;
};

export const Combobox = (props: Props) => {
  const { name, list, initialValue = '', placeholder, onInputChange } = props;

  const [isToggled, setIsToggled] = useState(false);
  const [isMatch, setIsMatch] = useState(!!initialValue);
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputClick = () => {
    // avoid rendering an empty box if there is an input but doesn't match
    if (list && inputValue && !isMatch) return;

    if (list) setIsToggled(!isToggled);
  };

  const handleInput = (value: string) => {
    setInputValue(value);
    onInputChange(value);
  };

  const handleInputChange: React.ComponentProps<'input'>['onChange'] = (e) => {
    const query = e.currentTarget.value;

    handleInput(query);

    if (list?.length) {
      // automatically render suggestions list if there is a match
      const match = list.filter((item) => {
        return item.value.includes(query);
      });

      const hasMatch = !!match.length;

      setIsMatch(hasMatch);
      setIsToggled(hasMatch);
    }
  };

  const handleClearInput = () => {
    setIsToggled(false);
    handleInput('');
  };

  const handleSuggestionClick: React.ComponentProps<'button'>['onClick'] = (
    e
  ) => {
    setIsMatch(true);
    setIsToggled(false);
    handleInput(e.currentTarget.value);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          onClick={handleInputClick}
          onChange={handleInputChange}
          value={inputValue}
          className="py-2 pl-6 w-full border rounded-lg"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center h-full">
          {!!inputValue.length && (
            <button type="button" onClick={handleClearInput}>
              <Cross className="h-5 w-5 text-slate-500 mr-5" />
            </button>
          )}

          {list && (
            <button
              type="button"
              className="pl-2 border-l-2"
              onClick={handleInputClick}
            >
              <Arrow className="h-6 w-6 rotate-180" />
            </button>
          )}
        </div>
      </div>

      {isToggled && (
        <ul className="absolute w-full max-h-48 overflow-scroll px-4 py-2 my-1 border rounded-lg z-50 bg-white flex flex-col gap-2">
          {list
            ?.filter((item) => item.value.includes(inputValue))
            .map((item) => (
              <li key={item.value} className="w-full">
                <button
                  type="button"
                  onClick={handleSuggestionClick}
                  value={item.value}
                  className="w-full"
                >
                  <div className="flex justify-between">
                    {item.label || item.value}

                    <Arrow className="h-5 w-5 rotate-90" />
                  </div>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
