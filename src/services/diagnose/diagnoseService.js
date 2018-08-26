'use strict'

require('../../../data/DiagnosisCodes/get_diagnosis_code_list.json')
require('../../../data/return.json')

import { getJSONData } from '../common'

const diagnoseServices = {
  /*
   string diagnosis_code,
   string diagnosis
   */

  getDiagnosisCodesList: function (data) {
    const dataUrl = '/static/api/get_diagnosis_code_list.json'
    const apiUrl = 'webservices.asmx/get_diagnosis_codes_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  /*
   string diagnosis_code,
   string diagnosis,
   string comments,
   string created_by
   */
  addDiagnosisCode: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_diagnosis_code'
    return getJSONData(dataUrl, apiUrl, data)
  },

  /*
   string diagnosis_code
   */
  getDiagnosisCode(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_diagnosis_code'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  /*
   string diagnosis_code
   */
  deleteDiagnosisCode: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_diagnosis_code'
    return getJSONData(dataUrl, apiUrl, data)
  },

  /*
   string diagnosis_code,
   string diagnosis,
   string comments,
   string updated_by
   */
  updateDiagnosisCode: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_diagnosis_code'
    return getJSONData(dataUrl, apiUrl, data)
  },
}

export default diagnoseServices
