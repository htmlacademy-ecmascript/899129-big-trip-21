import ApiService from '../framework/api-service.js';
import { Path } from '../const.js';

class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({ url: Path.DESTINATIONS })
      .then(ApiService.parseResponse);
  }
}

export default DestinationsApiService;
