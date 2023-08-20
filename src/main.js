import MainPresenter from './presenter/main-presenter.js';

const siteMainElement = document.querySelector('.page-body');

const mainPresenter = new MainPresenter({mainContainer: siteMainElement});
mainPresenter.init();
