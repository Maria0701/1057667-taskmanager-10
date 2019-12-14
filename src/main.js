import BoardComponent from './components/board.js';
import SiteFilterComponent from './components/filter.js';
import SiteMenuComponent from './components/menu.js';
import BoardController from './controllers/board.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/tasks.js';
import {render, RenderPosition} from './utils/render.js';
const TASK_COUNT = 25;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new SiteFilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
