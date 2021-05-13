import React from 'react';
import TimePicker from '../TimePicker';
import { mount } from 'enzyme';
import { differenceInMinutes, parse, eachMinuteOfInterval, startOfDay, endOfDay } from 'date-fns';

describe('TimePicker', () => {
  test('Should resolve', () => {
    expect(TimePicker).toEqual(expect.anything());
  });

  test('Should render buttons for every 15 minutes', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const onChange = jest.fn();
    const timePicker = mount(<TimePicker onChange={onChange} value={new Date()} />);

    expect(timePicker.find('button')).toHaveLength(96);
  });

  test('Should call onChange on button click', () => {
    const onChange = jest.fn();
    const timePicker = mount(<TimePicker onChange={onChange} value={new Date()} />);

    timePicker.find('button').forEach(button => button.simulate('click'));

    expect(onChange).toHaveBeenCalledTimes(96);
  });

  test('Should find closest interval', () => {
    const onChange = jest.fn();

    const start = startOfDay(new Date());
    const end = endOfDay(start);

    eachMinuteOfInterval(
      {
        start,
        end,
      },
      { step: 4 } // Full coverage would be every 1 minute, but 4 is much faster and covers most cases
    ).forEach(interval => {
      const timePicker = mount(<TimePicker onChange={onChange} value={interval} />);

      const closest_interval = parse(
        timePicker.instance().closest_interval.current.value,
        'T',
        new Date()
      );

      expect(Math.abs(differenceInMinutes(closest_interval, interval))).toBeLessThan(
        differenceInMinutes(end, interval) > 15 ? 8 : 15
      );
    });
  });
});
