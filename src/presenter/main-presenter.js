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
import { RENDER_EVENT_COUNT } from '../const';


export default class MainPresenter {
  eventListComponent = new EventListView();
  eventEditingComponent = new EventEditingView();
  eventDetailsComponent = new EventDetailsView();

  constructor({ mainContainer }) {
    this.mainContainer = mainContainer;
  }

  init() {
    const tripMainElement = this.mainContainer.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');
    const tripEventsElement = this.mainContainer.querySelector('.trip-events');


    render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), tripControlsElement);
    render(new SortView, tripEventsElement);
    render(this.eventListComponent, tripEventsElement);

    render(this.eventEditingComponent, this.eventListComponent.getElement());
    render(new EventHeaderView(), this.eventEditingComponent.getElement());
    render(this.eventDetailsComponent, this.eventEditingComponent.getElement());
    render (new EventOffersView, this.eventDetailsComponent.getElement());
    render(new EventDestinationView, this.eventDetailsComponent.getElement());

    for (let i = 0; i < RENDER_EVENT_COUNT; i++) {
      render(new EventItemView, this.eventListComponent.getElement());
    }
  }
}
