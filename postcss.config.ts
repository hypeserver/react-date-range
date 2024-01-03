import autoprefixer from 'autoprefixer';
import cssImport from 'postcss-import';

const PostCSSConfig = {
  plugins: [cssImport(), autoprefixer()]
};

export default PostCSSConfig;