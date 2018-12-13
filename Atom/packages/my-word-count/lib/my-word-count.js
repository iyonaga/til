'use babel';

import MyWordCountView from './my-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  myWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myWordCountView = new MyWordCountView(state.myWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myWordCountView.destroy();
  },

  serialize() {
    return {
      myWordCountViewState: this.myWordCountView.serialize()
    };
  },

  toggle() {
    console.log('MyWordCount was toggled!');
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.myWordCountView.setCount(words);
      this.modalPanel.show();
    }
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
