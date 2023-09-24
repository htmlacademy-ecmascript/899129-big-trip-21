import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';

const siteMainElement = document.querySelector('.page-body');

const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();

const mainPresenter = new MainPresenter({
  mainContainer: siteMainElement,
  pointsModel: pointModel,
  destinationsModel: destinationModel,
  offersModel: offerModel
});

mainPresenter.init();
