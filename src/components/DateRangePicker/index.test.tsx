import React from 'react';
import { mount, shallow } from 'enzyme';

import DateRangePicker from '.';

describe('DateRangePicker tests', () => {
  test('Should call "renderStaticRangeLabel" callback 0 times', () => {
    const renderStaticRangeLabel = jest.fn();
    mount(
      <DateRangePicker
        retainEndDateOnFirstSelection={false}
        weekStartsOn={1}
        onChange={item => {
          if (!item || item.selection === undefined)
            return;
          const selection = item.selection;
          renderStaticRangeLabel();
          console.log('selection start', selection.startDate);
          console.log('selection end', selection.endDate);
        }}
      />
    );
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(0);
  });

  test('Should render', () => {
    Date.now = jest.fn(() => 1482363367071);
    const wrapper = shallow(
      <DateRangePicker
        retainEndDateOnFirstSelection={false}
        weekStartsOn={0}
        onChange={item => {
          if (!item || item.selection === undefined)
            return;
          const selection = item.selection;
          console.log('selection start', selection.startDate);
          console.log('selection end', selection.endDate);
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});