import Rest from '@/services/Rest';

/**
 * @typedef {DoctorService}
 */
export default class DoctorService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/doctor'
}
