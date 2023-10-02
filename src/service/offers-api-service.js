import ApiService from '../framework/api-service.js';
import { Path } from '../const.js';

class OffersApiService extends ApiService {
  get offers() {
    return this._load({ url: Path.OFFERS })
      .then(ApiService.parseResponse);
  }
}

export default OffersApiService;
