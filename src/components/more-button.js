import AbstractComponent from './abstract-component.js';

const createMoreButton = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return createMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
