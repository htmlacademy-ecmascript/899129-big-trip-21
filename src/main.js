import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './service/points-api-servise.js';
import OffersApiService from './service/offers-api-service.js';
import DestinationsApiService from './service/destinations-api-service.js';

const AUTHORIZATION = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const pointsModel = new PointModel({
  apiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OfferModel({
  apiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationModel({
  apiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const pagePresenter = new PagePresenter();

const loadData = async () => {
  await offersModel.init();
  await destinationsModel.init();
  await pointsModel.init();
};

loadData();
pagePresenter.init(pointsModel, offersModel, destinationsModel, filterModel);
