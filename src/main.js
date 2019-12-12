import SiteMenuComponent from './components/menu.js';
import SiteFilterComponent from './components/filter.js';
import SiteBoardComponent from './components/board.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import LoadMoreButton from './components/more-button.js';
import SortComponent from './components/sort.js';
import TaskListComponent from './components/task-list.js';
import NoTasksComponent from './components/no-tasks.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/tasks.js';
import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const TASK_SHOWING_ON_LOAD_MORE = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);


const filters = generateFilters();
render(siteMainElement, new SiteFilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteBoardComponent().getElement(), RenderPosition.BEFOREEND);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(boardElement, new TaskListComponent().getElement(), RenderPosition.BEFOREEND);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToTask);
  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount)
  .forEach((task) => renderTask(task));


const loadMoreButtonComponent = new LoadMoreButton();
render(boardElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_SHOWING_ON_LOAD_MORE;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
