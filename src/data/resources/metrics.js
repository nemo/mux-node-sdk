/*!
 * Mux Metrics
 * Copyright(c) 2018 Mux Inc.
 */

const api = require('../../utils/api');

/**
 * @private Base metrics path for the Mux API
 * */
const PATH = '/data/v1/metrics';

/**
 * Metrics Class - Provides access to the Mux Data Metrics API
 *
 * @example
 * const muxClient = new Mux(accessToken, secret);
 * const { Data } = muxClient;
 *
 * // List all of the values across every breakdown for a specific metric grouped by operating system
 * Data.metrics.breakdown('aggregate_startup_time', { group_by: 'operating_system' });
 */
class Metrics {
  /**
   * @ignore
   * Metrics Constructor
   *
   * @param {string} accessToken - Mux API Access Token
   * @param {string} secret - Mux API Access Token secret
   * @constructor
   */
  constructor(accessToken, secret) {
    if (typeof accessToken === 'undefined') {
      throw new Error('API Access Token must be provided.');
    }

    if (typeof secret === 'undefined') {
      throw new Error('API secret key must be provided');
    }

    /**
     *  @ignore
     *  @type {Object} requestOptions - The HTTP request options for Mux Assets
     *  @property {string} requestOptions.auth.username - HTTP basic auth username (access token)
     *  @property {string} requestOptions.auth.password - HTTP basic auth password (secret)
     * */
    this.requestOptions = {
      auth: {
        username: accessToken,
        password: secret,
      },
    };
  }

  /**
   * List the breakdown values for a specific metric
   *
   * @param {string} metricId - The metric name/id for see https://api-docs.mux.com/#breakdown-get for a list of all metric ids
   * @param {Object} queryParams - example: {group_by: 'browser'}
   * NOTE: the group_by query parameter is required
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Data } = muxClient;
   *
   * // List all of the values across every breakdown for a specific metric grouped by browser
   * Data.metrics.breakdown('aggregate_startup_time', { group_by: 'browser' });
   *
   * @see https://api-docs.mux.com/#breakdown-get
   */
  breakdown(metricId, queryParams) {
    return api.get(`${PATH}/${metricId}/breakdown`, queryParams, this.requestOptions);
  }

  /**
   * List all of the values across every breakdown for a specific metric
   *
   * @param {Object} queryParams - example { value: 'safari', timeframe: '24:hours', dimension: 'cdn' }
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Data } = muxClient;
   *
   * // List the breakdown values for a specific metric within the last 24 hours
   * Data.metrics.comparison({ value: 'safari', timeframe: '24:hours', dimension: 'cdn' });
   * Note: the value query parameter is required
   *
   * @see https://api-docs.mux.com/#comparison-get
   */
  comparison(queryParams) {
    if (!queryParams || (queryParams && !queryParams.value)) {
      throw new Error('The value query parameter is required for comparing metrics');
    }
    return api.get(`${PATH}/comparison`, queryParams, this.requestOptions);
  }

  /**
   * Returns a list of insights for a metric. These are the worst performing values across all
   * breakdowns sorted by how much they negatively impact a specific metric.
   *
   * @param {string} metricId - The metric name/id for see https://api-docs.mux.com/#breakdown-get for a list of all metric ids
   * @param {Object} [queryParams] - example { measurement: 'median', order_direction: 'desc' }
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Data } = muxClient;
   *
   * // Get a list of insights for a metric measured by median and ordered descending
   * Data.metrics.insights('aggregate_startup_time', { measurement: 'median', order_direction: 'desc' });
   *
   * @see https://api-docs.mux.com/#insight-get
   */
  insights(metricId, queryParams) {
    if (!metricId) {
      throw new Error('A metric Id is required for insight metrics.');
    }
    return api.get(`${PATH}/${metricId}/insights`, queryParams, this.requestOptions);
  }

  /**
   * Returns the overall value for a specific metric, as well as the total view count,
   * watch time, and the Mux Global metric value for the metric.
   *
   * @param {string} metricId - The metric name/id for see https://api-docs.mux.com/#overall-get for a list of all metric ids
   * @param {Object} [queryParams] - example { timeframe: ['7:days'], filters: ['operating_system:windows'] }
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Data } = muxClient;
   *
   * // Get the overall value for a specific metric within the past 7 days
   * Data.metrics.overall('aggregate_startup_time', { timeframe: ['7:days'] });
   *
   * @see https://api-docs.mux.com/#overall-get
   */
  overall(metricId, queryParams) {
    if (!metricId) {
      throw new Error('A metric Id is required for overall metrics.');
    }
    return api.get(`${PATH}/${metricId}/overall`, queryParams, this.requestOptions);
  }

  /**
   * Returns timeseries data for a specific metric
   *
   * @param {string} metricId - The metric name/id for see https://api-docs.mux.com/#timeseries for a list of all metric ids
   * @param {Object} [queryParams] - example { timeframe: ['7:days'], filters: ['operating_system:windows'] }
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Data } = muxClient;
   *
   * // Get timeseries data for a specific metric within the past 7 days
   * Data.metrics.timeseries('aggregate_startup_time', { timeframe: ['7:days'] });
   *
   * @see https://api-docs.mux.com/#timeseries
   */
  timeseries(metricId, queryParams) {
    if (!metricId) {
      throw new Error('A metric Id is required for timeseries metrics.');
    }
    return api.get(`${PATH}/${metricId}/timeseries`, queryParams, this.requestOptions);
  }
}

module.exports = Metrics;
