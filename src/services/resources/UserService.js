import Rest from '@/services/Rest';

/**
 * @typedef {UserService}
 */
export default class UserService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/user'
}
