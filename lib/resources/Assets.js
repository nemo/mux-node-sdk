/*!
 * mux
 * Copyright(c) 2018 Mux Inc.
 */

const { post, get, del } = require('../utils/api');

const PATH = 'video/v1/assets/';
const buildBasePath = assetId => `${PATH}/${assetId}`;

/**
 * Mux class
 * @class
 */
class Assets {
  constructor(config) {
    if (config.apiKey === undefined) {
      throw new Error('API key must be provided.');
    }

    if (config.secret === undefined) {
      throw new Error('API secret key must be provided');
    }

    this.requestOptions = {
      auth: {
        username: config.apiKey,
        password: config.secret,
      },
    };
  }

  create(params) {
    return post(PATH, { body: params, ...this.requestOptions });
  }

  del(assetId) {
    return del(buildBasePath(assetId), this.requestOptions);
  }

  get(assetId) {
    return get(buildBasePath(assetId), this.requestOptions);
  }

  inputInfo(assetId) {
    return del(`${buildBasePath(assetId)}/input-info`, this.requestOptions);
  }

  list() {
    return get(PATH, this.requestOptions);
  }
}


module.exports = Assets;