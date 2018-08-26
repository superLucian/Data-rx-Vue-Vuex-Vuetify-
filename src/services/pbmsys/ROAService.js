import BaseMedsys from './BaseMedsysClass'
import {baseUrl, httpWrapper} from '../common'

export default class ROAService extends BaseMedsys {
  constructor() {
    super(baseUrl, 'RouteOfAdministrationWebService')
  }

  get(data) {
    if (window.localMode) {
      const dataUrl = '/static/api/get_group_plan_mac.json'
      return httpWrapper.loadRedemptionData(dataUrl)
    } else {
      return httpWrapper.LoadJSONData(this.getUrl, data)
    }
  }

  getById(data) {
    if (window.localMode) {
      const dataUrl = '/static/api/get_group_plan_mac.json'
      return httpWrapper.loadRedemptionData(dataUrl)
    } else {
      return httpWrapper.LoadJSONData(this.getByIdUrl, data)
    }
  }

  getByKey(data) {
    if (window.localMode) {
      const dataUrl = '/static/api/get_group_plan_mac.json'
      return httpWrapper.loadRedemptionData(dataUrl)
    } else {
      return httpWrapper.LoadJSONData(this.getByKeyUrl, data)
    }
  }

  update(data) {
    if (!window.localMode) {
      return httpWrapper.LoadJSONData(this.updateUrl, data)
    }
  }

  add(data) {
    if (!window.localMode) {
      return httpWrapper.LoadJSONData(this.addUrl, data)
    }
  }

}
