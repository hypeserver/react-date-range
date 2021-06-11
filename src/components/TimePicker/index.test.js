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

    const update = jest.fn();
    const timePicker = mount(<TimePicker update={update} value={new Date()} />);

    expect(timePicker.find('button')).toHaveLength(96);
  });

  test('Should call update on button click', () => {
    const update = jest.fn();
    const timePicker = mount(<TimePicker update={update} value={new Date()} />);

    timePicker.find('button').forEach(button => button.simulate('click'));

    expect(update).toHaveBeenCalledTimes(96);
  });

  test('Should find closest interval', () => {
    const update = jest.fn();

    const start = startOfDay(new Date());
    const end = endOfDay(start);

    eachMinuteOfInterval(
      {
        start,
        end,
      },
      { step: 4 } // Full coverage would be every 1 minute, but 4 is much faster and covers most cases
    ).forEach(interval => {
      const timePicker = mount(<TimePicker update={update} value={interval} />);

      const closest_interval = parse(
        timePicker.instance().closest_interval.current.value,
        TimePicker.defaultProps.dateDisplayFormat,
        new Date()
      );

      expect(Math.abs(differenceInMinutes(closest_interval, interval))).toBeLessThan(
        differenceInMinutes(end, interval) > 15 ? 8 : 15
      );
    });
  });
});
