import Rest from '@/services/Rest';

/**
 * @typedef {PatientService}
 */
export default class PatientService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/patient'
}
