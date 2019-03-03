const babelRc = require('./.babelrc');

module.exports = {
  context: __dirname,
  devtool: 'cheap-module-source-map',
  externals: {},
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelRc,
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     { 
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8000,
      //       },
      //     },
      //   ],
      // },  
    ],
  },
  plugins: [
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [
      '.js', 
      '.jsx', 
      '.ts', 
      '.tsx',
    ],
  },
  target: 'web',
};
