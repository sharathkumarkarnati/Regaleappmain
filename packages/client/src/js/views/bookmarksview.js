import View from "./view.js";
import previewView from "./previewView.js";
import { AJAX } from "../helpers.js";
import { loadConfig } from "../loadConfig.js";

const SERVER_URI = loadConfig().SERVER_URI;

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "";

  _button = document.querySelector(".nav__btn--bookmarks");

  constructor(...args) {
    super(...args);

    window.document.addEventListener("click", (e) => {
      if (this._button) {
        if (this._parentElement.contains(e.target)) {
          // do nothing
        } else {
          if (e.target === this._button || this._button.contains(e.target)) {
            this._button.classList.toggle("show");
          } else {
            this._button.classList.remove("show");
          }
        }
        const isOpen = this._button.classList.contains("show");
        if (isOpen) {
          this.renderSpinner();
          try {
            AJAX(`${SERVER_URI}/api/bookmarks`)
              .then((data) => {
                this.render(data.bookmarks);
              })
              .catch(() => {
                this.render([]);
              });
          } catch {
            this.render([]);
          }
        } else {
          this._clear();
        }
      }
    });
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
