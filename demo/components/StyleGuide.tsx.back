import React from 'react';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';
type StylesProps = { font: string; base: string; light: string; link: string; baseBackground: string; mq: { small: string; } };
const styles = ({ font, base, light, link, baseBackground, mq }: StylesProps) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  header: {
    color: '#fff',
    backgroundColor: link,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
  },
  headerLink: {
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: '#efefef',
    },
    '&:hover, &:active': {
      color: '#fff',
      cursor: 'pointer',
    },
  },
  content: {
    maxWidth: 1000,
    padding: [[15, 30]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
  },
  components: {
    overflow: 'auto', // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

type ClassesProp = {
  root: string;
  header: string;
  content: string;
  bar: string;
  headerLink: string;
  nav: string;
  footer: string;
}

type StyleGuideRendererProps = { classes: ClassesProp; title: JSX.Element | string | number; homepageUrl: string; children: JSX.Element; };

export function StyleGuideRenderer({ classes, title, homepageUrl, children }: StyleGuideRendererProps) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.content}>
          <div className={classes.bar}>
            <Logo>
              <a className={classes.headerLink} href="#">
                {title}
              </a>
            </Logo>
            <nav className={classes.nav}>
              <a className={classes.headerLink} href="https://github.com/gbili/react-date-range-ts">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown text={`Created with [React Styleguidist](${homepageUrl}) ❤️`} />
        </footer>
      </main>
    </div>
  );
}

export default Styled(styles)(StyleGuideRenderer);
