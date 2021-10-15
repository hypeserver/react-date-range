import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '.';

describe('Calendar tests', () => {
  test('Should render', () => {
    Date.now = jest.fn(() => 1482363367071);
    const wrapper = shallow(
      <Calendar
        weekStartsOn={0}
        onChange={item => {
          console.log('item selected:', item);
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});