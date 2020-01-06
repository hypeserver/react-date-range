### Internationalization

```jsx inside Markdown
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const [locale, setLocale] = React.useState('ja');
<Calendar
  locale={locales[locale]}
  date={null}
  className={'PreviewArea'}
/>

```
