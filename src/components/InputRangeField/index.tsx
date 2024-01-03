import React, { ChangeEvent, FocusEvent, ReactElement, ReactNode } from 'react';

const MIN = 0;
const MAX = 99999;

type InputRangeFieldProps = {
  value?: string | number,
  styles: {
    inputRange: string,
    inputRangeInput: string,
    inputRangeLabel?: string
  },
  placeholder?: string,
  label: ReactElement | ReactNode,
  onChange: (value: number) => void,
  onBlur: (event: FocusEvent<HTMLInputElement>) => void,
  onFocus: (event: FocusEvent<HTMLInputElement>) => void
};

export default function InputRangeField({
  styles,
  placeholder = '-',
  value = '',
  label,
  onChange,
  onBlur,
  onFocus
}: InputRangeFieldProps) {

  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);

    onChange(value);
  }

  return (
    <div className={styles.inputRange}>
      <input
      className={styles.inputRangeInput}
      placeholder={placeholder}
      value={value}
      min={MIN}
      max={MAX}
      onChange={onChangeInternal}
      onBlur={onBlur}
      onFocus={onFocus}
      />
      <span className={styles.inputRangeLabel}>{label}</span>
    </div>
  )
}