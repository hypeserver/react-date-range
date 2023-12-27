import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import InputRangeField from '../InputRangeField';

const styles = {
  inputRange: 'range',
  inputRangeInput: 'input',
  inputRangeLabel: 'label',
};
const toChangeEvent = value => ({ target: { value } });

describe('InputRangeField tests', () => {
  test('Should parse input value to number', () => {
    const onChange = jest.fn();
    const wrapper = render(
      <InputRangeField
        label="Input label"
        placeholder="Placeholder"
        styles={styles}
        onChange={onChange}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent('3'));
    expect(onChange).lastCalledWith(3);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent(12));
    expect(onChange).lastCalledWith(12);
    // fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent(''));
    // expect(onChange).lastCalledWith(0);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent('invalid number'));
    expect(onChange).lastCalledWith(0);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent(-12));
    expect(onChange).lastCalledWith(0);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent(99999999));
    expect(onChange).lastCalledWith(99999);

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should rerender when props change', () => {
    const wrapper = render(
      <InputRangeField
        value={12}
        placeholder="Placeholder"
        label="Input label"
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Placeholder').className).toEqual(styles.inputRangeInput);
    expect(screen.getByText('Input label').className).toEqual(styles.inputRangeLabel);

    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('12');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('Input label')).toBeInTheDocument();

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="Placeholder"
        label="Input label"
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('Input label')).toBeInTheDocument();

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="-"
        label="Input label"
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('-').value).toEqual('32');
    expect(screen.getByPlaceholderText('-').placeholder).toEqual('-');
    expect(screen.getByText('Input label')).toBeInTheDocument();

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="Placeholder"
        label="Label"
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  test('Should render the label as a Component', () => {
    const Label = () => <span className="input-range-field-label">Input label 2</span>;
    const wrapper = render(
      <InputRangeField
        value={12}
        placeholder="Placeholder"
        label={<Label />}
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('12');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('Input label 2')).toBeInTheDocument();
    expect(screen.getByText('Input label 2')).toBeInTheDocument();
    expect(screen.getByText('Input label 2').className).toEqual('input-range-field-label');

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="Placeholder"
        label={<Label />}
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('Input label 2')).toBeInTheDocument();

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="-"
        label={<Label />}
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('-').value).toEqual('32');
    expect(screen.getByPlaceholderText('-').placeholder).toEqual('-');
    expect(screen.getByText('Input label 2')).toBeInTheDocument();

    wrapper.rerender(
      <InputRangeField
        value={32}
        placeholder="Placeholder"
        label="New label"
        styles={styles}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
      { container: wrapper.container }
    );
    expect(screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(screen.getByText('New label')).toBeInTheDocument();
  });
});
