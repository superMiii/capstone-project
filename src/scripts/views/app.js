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
    if (page == undefined) {
      this._content.innerHTML = ` <h1 class="d-flex justify-content-center" style="color:#5921F6"> 404 Not Found </h1> 
                                <iframe src="https://embed.lottiefiles.com/animation/86875" class="d-flex justify-content-center" width="100%" height="380px"></iframe>
                                <div class="d-grid col-md-2 mx-auto px-4">
                                  <a href="#/home" class="btn-sign-up text-center">Back to Home</a>
                                </div>
      `;
    }
    this._navbar.innerHTML = `
    <component-navbar></component-navbar>
    `
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}
 
export default App;
