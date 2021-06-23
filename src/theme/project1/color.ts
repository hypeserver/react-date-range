const colors: { [index: string]: string } = {
  red: '#e94b35',
  black: '#323232',
  blue: '#337ab7',
  blueHover: '#286090',
  green: '#3c763d',
  greenHover: '#2b542c',
  orange: '#ff9900',
  white: '#FFFFFF',
};

const color = (colorName: string): string => {
  return colorName ? colors[colorName] : 'inherit';
};

export default color;
