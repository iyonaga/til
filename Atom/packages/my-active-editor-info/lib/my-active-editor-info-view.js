'use babel';

export default class MyActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('my-active-editor-info');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The MyActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      if (!atom.workspace.isTextEditor(item)) {
        message.innerText = 'Open a file to see important information about it.';
        return;
      }

      message.innerHTML = `
        <h2>${item.getFileName() || 'untitled'}</h2>
        <ul>
        <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
        <li><b>Tab Length:</b> ${item.getTabLength()}</li>
        <li><b>Encoding:</b> ${item.getEncoding()}</li>
        <li><b>Line Count:</b> ${item.getLineCount()}</li>
        </ul>
      `;
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: 'my-active-editor-info/MyActiveEditorInfoView';
    }
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose()
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    return 'Active Editor Info';
  }

  getURI() {
    return 'atom://my-active-editor-info';
  }

  getDefaultLocation() {
    return 'right';
  }

  getAllowedLocations() {
    return ['left', 'right', 'bottom'];
  }

  deserializeActiveEditorInfoView(serialized) {
    return new ActiveEditorInfoView();
  }
}
