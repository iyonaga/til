const mix = require('laravel-mix');

mix.react('resources/js/app.jsx', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.browserSync({
  //logLevel: 'silent',
  ghostMode: false,
  online: false,
  files: ["public/**/*"],
  open: false,
  port: 8080,
  proxy: '',
  ui: false,
  server: {
    baseDir: "./public/",
  },
});
