export const fontSizes: { [index: string]: string } = {
  xs: '0.83125rem',
  s: '1rem',
  m: '1.2rem',
  l: '1.44rem',
  xl: '1.725rem',
  super: '6.25rem',
};

const fontSize = (size: string): string => {
  return size ? fontSizes[size] : '';
};

export default fontSize;
