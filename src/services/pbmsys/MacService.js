import BasePbmsys from './BasePbmsysClass'
import {baseUrl, httpWrapper} from '../common'

export default class GroupService extends BasePbmsys {
  constructor() {
    super(baseUrl, 'MacWebService')
  }

  update() {
  }

  get(data) {
    if (window.localMode) {
      const dataUrl = '/static/api/get_group_plan_mac.json'
      return httpWrapper.loadRedemptionData(dataUrl)
    } else {
      return httpWrapper.LoadJSONData(this.getUrl, data)
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
