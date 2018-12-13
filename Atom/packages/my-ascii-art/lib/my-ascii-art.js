'use babel';

import MyAsciiArtView from './my-ascii-art-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-ascii-art:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    console.log('Convert text!');
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      const selection = editor.getSelectedText();

      const figlet = require('figlet');
      const font = 'o8';
      figlet(selection, { font }, function (error, art) {
        if (error) {
          console.log(error);
        } else {
          editor.insertText(`\n${art}\n`);
        }
      })
    }
  }

};
