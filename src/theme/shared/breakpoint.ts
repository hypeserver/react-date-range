export const ScreenSizes: { [index: string]: number } = {
  small: 740,
  medium: 1024,
  large: 1440,
};

export default (size: string): string => {
  return size ? `(min-width: ${ScreenSizes[size]}px)` : 'inherit';
};
