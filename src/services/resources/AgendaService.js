import Rest from '@/services/Rest';

/**
 * @typedef {AgendaService}
 */
export default class AgendaService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/agenda'
}
