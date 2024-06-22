SystemJS.config({
  baseURL:'https://unpkg.com/',
  defaultExtension: true,
  packages: {
    ".": {
      main: './App',
      defaultExtension: 'jsx' || 'js'
    }
  },
  meta: {
    '*.jsx': {
      'babelOptions': {
        react: true
      }
    }, 
    '*.js': {
      'babelOptions': {
        react: true
      }
    }
  },
  map: {
    'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
    'react': 'react@18.2.0/umd/react.development.js',
    'react-dom': 'react-dom@18.2.0/umd/react-dom.development.js'
  },
  transpiler: 'plugin-babel'
});

SystemJS.import('./App')
  .catch(console.error.bind(console));
