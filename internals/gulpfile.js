(function changeCurrentWorkingDirectoryToResolveNodeModulesPath() {
  process.chdir('../');
  console.info('Current working directory %s', process.cwd());
})();

const babel = require('gulp-babel');
const chalk = require('chalk');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const util = require('util');
const webpack = require("webpack");

const babelRc = require('./.babelrc');
const tsConfig = require('../tsconfig.json');
const webpackConfig = require('./webpack.config');

const ROOT_PATH = (function(currentWorkingDirectory) {
  const rootPath = fs.realpathSync(currentWorkingDirectory);
  const pJson = fs.existsSync(`${rootPath}/package.json`);
  if (!pJson) {
    console.error(
`Current working directory might not be the project root directory.
Did you call process.chdir() properly?`);
    process.exit(0);
  }
  return rootPath;
})(process.cwd());

const paths = {
  lib: path.resolve(ROOT_PATH, 'lib'),
  src: path.resolve(ROOT_PATH, 'src'),
};

const buildLog = (tag, ...args) => {
  console.info(chalk.cyan(`[gulp>${tag}]`), util.format(...args));
};

const Task = {
  BABEL: 'babel',
  BUILD: 'build',
  CLEAN: 'clean',
  COPY: 'copy',
  TSC: 'tsc',
  WEBPACK: 'webpack',
};

gulp.task(Task.CLEAN, () => {
  buildLog(Task.CLEAN, 'LIB_PATH: %s', paths.lib);

  return del([
    `${paths.lib}/**/*`,
  ]);
});

gulp.task(Task.COPY, () => {
  return gulp.src([`${paths.src}/**/!(*.ts)`])
    .pipe(gulp.dest(paths.lib));
});

gulp.task(Task.TSC, () => {
  buildLog(Task.TSC, 'tsconfig: %o', tsConfig.compilerOptions);
  const tsProject = ts.createProject(tsConfig.compilerOptions);

  return gulp.src([
    `${paths.src}/**/*.{js,jsx,ts,tsx}`,
  ])
    .pipe(tsProject())
    .pipe(gulp.dest(paths.lib));
});

gulp.task(Task.WEBPACK, (done) => {
  const compiler = webpack({
    ...webpackConfig,
    entry: `${paths.src}/options/options.tsx`,
    output: {
      filename: 'options.js',
      path: `${paths.lib}`,
    },
  });

  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined,
  }, (err, stats) => {
    console.log(stats.toString('normal'));
    done();
  });
});

gulp.task(Task.BUILD, gulp.series(
  Task.CLEAN, 
  Task.COPY, 
  gulp.parallel(Task.TSC, Task.WEBPACK),
));
