import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import EventEditingView from '../view/event-editing-view';
import EventDetailsView from '../view/event-details-view';
import FilterView from '../view/filter-view';
import EventListView from '../view/event-list-view';
import EventDestinationView from '../view/event-destination-view';
import EventHeaderView from '../view/event-header-view';
import EventOffersView from '../view/event-offers-view';
import EventItemView from '../view/event-item-view';
import { RenderPosition, render } from '../render';

export default class MainPresenter {
  eventListComponent = new EventListView();
  eventEditingComponent = new EventEditingView();
  eventDetailsComponent = new EventDetailsView();

  constructor({ mainContainer, pointsModel, destinationsModel, offersModel }) {
    this.mainContainer = mainContainer;
    this.pointModel = pointsModel;
    this.destinationModel = destinationsModel;
    this.offerModel = offersModel;
  }

  init() {
    const tripMainElement = this.mainContainer.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');
    const tripEventsElement = this.mainContainer.querySelector('.trip-events');

    this.points = this.pointModel.get();
    this.destinations = this.destinationModel.get();
    this.offers = this.offerModel.get();

    const formDestination = this.destinationModel.getById(this.points[0].destination);
    const formOffers = this.offerModel.getByType(this.points[0].type);

    render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), tripControlsElement);
    render(new SortView, tripEventsElement);
    render(this.eventListComponent, tripEventsElement);

    render(this.eventEditingComponent, this.eventListComponent.getElement());
    render(new EventHeaderView({ point: this.points[0], destination: formDestination, destinationList: this.destinations }), this.eventEditingComponent.getElement());
    render(this.eventDetailsComponent, this.eventEditingComponent.getElement());

    if (formDestination) {
      render(new EventDestinationView({ destination: formDestination }), this.eventDetailsComponent.getElement());
    }

    if (formOffers.length) {
      render(new EventOffersView({ pointOffers: this.points[0].offers, typeOffers: formOffers }), this.eventDetailsComponent.getElement());
    }

    for (let i = 0; i < this.points.length; i++) {

      const offers = this.offerModel.getByType(this.points[i].type);

      const destination = this.destinationModel.getById(this.points[i].destination);
      render(new EventItemView({ point: this.points[i], offers: offers, destination: destination }), this.eventListComponent.getElement());
    }
  }
}
