import React from 'react';
import { shallow } from 'enzyme';
import DayCell from './DayCell';
import coreStyles from '../styles';
import { generateStyles } from '../utils';

describe('DayCell', () => {
  const styles = generateStyles([coreStyles, {}]);
  const startDate = new Date('2030-01-01T00:00:00.000Z');
  const endDate = new Date('2035-01-01T00:00:00.000Z');
  const day = new Date('2034-12-31T00:00:00.000Z');
  const ranges = [
    {
      startDate,
      endDate,
      key: 'theFuture',
    },
  ];

  test('renders without crashing', () => {
    shallow(<DayCell day={day} styles={styles} ranges={ranges} />);
  });

  test('renders a numeric day as text', () => {
    const wrapper = shallow(<DayCell day={day} styles={styles} ranges={ranges} />);

    expect(wrapper.text()).toBe(String(day.getDate()));
  });
});
