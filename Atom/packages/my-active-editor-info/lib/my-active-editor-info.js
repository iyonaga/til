'use babel';

import MyActiveEditorInfoView from './my-active-editor-info-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      atom.workspace.addOpener(uri => {
        if (uri == 'atom://my-active-editor-info') {
          return new MyActiveEditorInfoView();
        }
      }),

      atom.commands.add('atom-workspace', {
        'my-active-editor-info:toggle': () => this.toggle()
      }),

      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof MyActiveEditorInfoView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    console.log('Toggle it!');
    atom.workspace.toggle('atom://my-active-editor-info')
  }

};
