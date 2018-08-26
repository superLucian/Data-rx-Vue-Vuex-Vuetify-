'use strict'

require('../../../data/return.json')
require('../../../data/edi/get_provider_ndc_adjustment_list.json')

import { getJSONData } from '../common'

const ediServices = {
  /*
   string pcc
   */
  getEdiList(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_provider_ndc_adjustment_list.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_provider_ndc_adjustment_list'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  //  Add a provider NDC adjustment
  // pcc string
  // pid int
  // ndc string
  // qty double
  // comments string
  // created_by string
  addProviderNdcAdjustment: function(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/add_provider_ndc_adjustment'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  }
}
export default ediServices
