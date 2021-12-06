/* eslint-disable class-methods-use-this */
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content, navbar }) {
    this._content = content;
    this._navbar = navbar;
  }
 
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._navbar.innerHTML = `
    <component-navbar></component-navbar>
    `
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}
 
export default App;
