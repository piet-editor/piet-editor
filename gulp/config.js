const dest = './dist';
const src = './src';

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false,
  },

  webpack: {
    entry: src + '/js/index.jsx',
    output: {
      filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          query: {
            plugins: ["transform-react-jsx"],
            presets: ['react', 'es2015'],
          },
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  },

  static: {
    src: [
      src + '/html/index.html',
    ],
    dest: dest,
  },
};
