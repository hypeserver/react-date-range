### 2 Month View

```jsx inside Markdown
import { addDays } from 'date-fns';

<DateRangePicker
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  className={'PreviewArea'}
  months={2}
  ranges={[
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]}
  direction="horizontal"
/>;
```

### Vertical Infinite

```jsx inside Markdown
import { addDays } from 'date-fns';

<DateRangePicker
  className={'PreviewArea'}
  months={1}
  minDate={addDays(new Date(), -300)}
  maxDate={addDays(new Date(), 900)}
  direction="vertical"
  scroll={{ enabled: true }}
  ranges={[
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    },
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'compare'
    }
  ]}
/>;
```

```jsx inside Markdown
import { addDays } from 'date-fns';

<DateRangePicker
  ranges={[
    {
      startDate: addDays(new Date(), 1),
      endDate: null,
      key: 'selection1'
    },
    {
      startDate: addDays(new Date(), 4),
      endDate: addDays(new Date(), 8),
      key: 'selection2'
    },
    {
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 10),
      key: 'selection3',
      showDateDisplay: false,
      autoFocus: false
    }
  ]}
  className={'PreviewArea'}
/>
```
