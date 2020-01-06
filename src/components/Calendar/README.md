DatePicker - Internationalization

```jsx inside Markdown
import Calendar from 'react-date-range/components/Calendar';
import * as locales from 'react-date-range/locale';
//import '../../dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file

const [locale, setLocale] = React.useState('ja');
<Calendar
  locale={locales[locale]}
  date={null}
  className={'PreviewArea'}
/>

```
