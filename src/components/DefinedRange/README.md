 <DefinedRange
  ranges={[this.state.definedRange.selection]}
  renderStaticRangeLabel={renderStaticRangeLabel}
  staticRanges={[
    {
      label: 'Hoy',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
      }),
      isSelected() {
        return true;
      },
    },
  ]}
  onChange={this.handleRangeChange.bind(this, 'definedRange')}
  className={'centered'}
/>