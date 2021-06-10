import React from 'react';
import { mount } from 'enzyme';

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
    const wrapper = mount(
      <InputRangeField
        label="Input label"
        styles={styles}
        onChange={onChange}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );

    wrapper.find('input').simulate('change', toChangeEvent('3'));
    expect(onChange).lastCalledWith(3);
    wrapper.find('input').simulate('change', toChangeEvent(12));
    expect(onChange).lastCalledWith(12);
    wrapper.find('input').simulate('change', toChangeEvent(''));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent('invalid number'));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(-12));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(99999999));
    expect(onChange).lastCalledWith(99999);

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should rerender when props change', () => {
    const wrapper = mount(
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

    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual(12);
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ value: '32' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ placeholder: '-' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ label: 'Label' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Label');
  });

  test('Should render the label as a Component', () => {
    const Label = () => <span className="input-range-field-label">Input label</span>;
    const wrapper = mount(
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

    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual(12);
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');
    expect(wrapper.find(`.input-range-field-label`).text()).toEqual('Input label');

    wrapper.setProps({ value: '32' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ placeholder: '-' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ label: 'Label' });
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Label');
  });
});
