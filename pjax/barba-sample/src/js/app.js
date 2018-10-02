import '../scss/entry.scss';
import Barba from 'barba.js';

// const PageTransition = Barba.BaseTransition.extend({
//   start: () => {
//
//   },
//
//   loadOut: (resolve) => {
//     resolve();
//   },
//
//   loadIn: () => {
//     this.done(;)
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  Barba.Pjax.start();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', () => {
    console.log('linkClicked');
  });
});
