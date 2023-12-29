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
import { useState, useEffect } from 'react';

const CustomStaticRangeLabelContent = ({ text }) => {
  const [currentDateString, setCurrentDateString] = useState(Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateString(Date());
    }, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [setCurrentDateString]);

  return (
    <span>
      <i>{text}</i>
      <span className="random-date-string">
        <b>{currentDateString}</b>
      </span>
    </span>
  );
}

const renderStaticRangeLabel = () => (
  <CustomStaticRangeLabelContent text={'This is a custom label content: '} />
);

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
