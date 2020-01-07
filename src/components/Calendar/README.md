### Internationalization

```jsx inside Markdown
import * as locales from 'react-date-range/dist/locale';

const [locale, setLocale] = React.useState('ja');

<Calendar
  locale={locales[locale]}
  date={null}
  className={'PreviewArea'}
/>

```
