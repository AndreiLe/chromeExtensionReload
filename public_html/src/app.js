import $ from 'jquery';
import Utils from './utils';

class App {
  constructor() {
  }

  init() {
    Utils.initExtension();
    $((event) => {
      this.addHtmlTemplate();
    });
  }

  addHtmlTemplate() {
    const buttonsDiv = $("html");
     buttonsDiv.prepend("Chrome extension update work!");
  }

}

export default App;
