import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
  test('renders without crashing', () => {
    shallow(<Calendar />);
  });

  test('renders a select with the localize long months', () => {
    const wrapper = shallow(<Calendar />);
    const monthSelect = wrapper.find('select').first();

    expect(monthSelect.children()).toHaveLength(12);

    const monthValuesWide = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    monthValuesWide.forEach((value, index) => {
      expect(monthSelect.childAt(index).text()).toBe(value);
    });
  });
});
