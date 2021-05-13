import React from 'react';
import DateInput from '../DateInput';
import TimePicker from '../TimePicker';
import { mount } from 'enzyme';

describe('DateInput', () => {
  test('Should resolve', () => {
    expect(DateInput).toEqual(expect.anything());
  });

  test('Should warn when TimePicker is used without time formatting', () => {
    const warn = console.warn;
    console.warn = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();

    mount(<DateInput showTimePicker onFocus={onFocus} onChange={onChange} />);

    expect(console.warn).toHaveBeenCalled();

    console.warn = warn;
  });

  test('Should display TimePicker on focus', () => {
    const onFocus = jest.fn();
    const onChange = jest.fn();

    const dateInput = mount(
      <DateInput
        showTimePicker
        onFocus={onFocus}
        onChange={onChange}
        dateDisplayFormat="MMM d, yyyy h:mma"
      />
    );

    dateInput.find('input').simulate('focus');

    expect(dateInput.find(TimePicker)).toHaveLength(1);
  });

  test('Should not display TimePicker on focus by default', () => {
    const onFocus = jest.fn();
    const onChange = jest.fn();

    const dateInput = mount(<DateInput onFocus={onFocus} onChange={onChange} />);

    dateInput.find('input').simulate('focus');

    expect(dateInput.find(TimePicker)).toHaveLength(0);
  });
});
