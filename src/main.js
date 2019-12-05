import {createSiteMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createMoreButton} from './components/more-button.js';
import {generateFilters} from './mock/filter.js';
import {generateSingleTask} from './mock/tasks.js';
import {generateTasks} from './mock/tasks.js';

const TASK_COUNT = 8;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);


const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
tasks.slice(1).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createMoreButton(), `beforeend`);
