import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';

const pointsModel = new PointModel();
const offersModel = new OfferModel();
const destinationsModel = new DestinationModel();
const filterModel = new FilterModel();

const pagePresenter = new PagePresenter({
  pointsModel: pointsModel,
  offersModel,
  destinationsModel,
  filterModel
});

pagePresenter.init();
