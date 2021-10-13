import React from 'react';
import { mount, shallow } from 'enzyme';

import DefinedRange from '.';
import { StaticRange } from '../../types';
import { createStaticRanges } from '../..';

describe('DefinedRange tests', () => {
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
    const renderStaticRangeLabel = jest.fn();
    const staticRanges = createStaticRanges([
      {
        label: 'Dynamic Label',
        range: {},
        hasCustomRendering: true,
      },
      {
        label: 'Static Label',
        range: {},
      },
      {
        label: 'Hede',
        range: {},
        hasCustomRendering: true,
      },
    ]);
    mount(
      <DefinedRange
        staticRanges={staticRanges}
        renderStaticRangeLabel={renderStaticRangeLabel}
      />
    );

    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });

  test('Should render dynamic static label contents correctly', () => {
    const renderItalicLabelContent = () => (
      <i className={'italic-label-content'}>{'Italic Content'}</i>
    );
    const renderBoldLabelContent = () => <b className={'bold-label-content'}>{'Bold Content'}</b>;
    const renderSomethingElse = () => <img className={'random-image'} />;

    const renderStaticRangeLabel = function(staticRange: StaticRange): JSX.Element {
      let result;

      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }

      return result;
    };

    const wrapper = shallow(
      <DefinedRange
        staticRanges={createStaticRanges([
          {
            id: 'italic',
            range: {},
            hasCustomRendering: true,
          },
          {
            label: 'Static Label',
            range: {},
          },
          {
            id: 'whatever',
            range: {},
            hasCustomRendering: true,
          },
          {
            id: 'bold',
            range: {},
            hasCustomRendering: true,
          },
        ])}
        renderStaticRangeLabel={renderStaticRangeLabel}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
