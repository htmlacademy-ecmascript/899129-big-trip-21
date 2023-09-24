import { createElement } from '../render';

function createdestinationPicturesTemplate(pictures) {
  return pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}></img>`);
}

function createEventDesinationTemplate(destination) {
  const description = destination.description ? destination.description : '';
  const pictures = destination.pictures;

  return (`<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>

  <div class="event__photos-container">
    <div class="event__photos-tape">
     ${createdestinationPicturesTemplate(pictures)}
    </div>
  </div>
</section>`);
}

export default class EventDestinationView {
  constructor({ destination }) {
    this.destination = destination;
  }


  getTemplate() {
    return createEventDesinationTemplate(this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

