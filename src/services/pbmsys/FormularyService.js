import BasePbmsys from './BasePbmsysClass'
import {baseUrl, httpWrapper} from '../common'

export default class FormularyService extends BasePbmsys {
  constructor() {
    super(baseUrl, 'FormularyWebService')
  }

  update() {

  }

  get(data) {
    if (window.localMode) {
      const dataUrl = '/static/api/grouMac/get.json'
      return httpWrapper.loadRedemptionData(dataUrl, {})
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
