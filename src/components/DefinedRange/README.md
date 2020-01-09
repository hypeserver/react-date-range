#### Example: Default Labels

```jsx inside Markdown
import { useState } from 'react';

const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection'
  }
]);

<DefinedRange
  onChange={item => setState([item.selection])}
  ranges={state}
/>;
```
#### Example: Custom range labels

```jsx inside Markdown
import { useState } from 'react';

const renderStaticRangeLabel = () => (
  <CustomStaticRangeLabelContent text={'This is a custom label content: '} />
);

class CustomStaticRangeLabelContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDateString: Date(),
    };

    this.intervalId = setInterval(() => {
      this.setState({
        currentDateString: Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { currentDateString } = this.state;
    const { text } = this.props;

    return (
      <span>
        <i>{text}</i>
        <span className={'random-date-string'}>
          <b>{currentDateString}</b>
        </span>
      </span>
    );
  }
}

const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection'
  }
]);

<DefinedRange
  onChange={item => setState([item.selection])}
  ranges={state}
  renderStaticRangeLabel={renderStaticRangeLabel}
  staticRanges={[
    {
      label: 'Hoy',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(),
        endDate: new Date()
      }),
      isSelected() {
        return true;
      }
    }
  ]}
/>;
```
