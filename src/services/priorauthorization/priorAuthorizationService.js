'use strict'

require('../../../data/return.json')
require('../../../data/priorAuth/get_list_by_provider.json')
require('../../../data/priorAuth/get_auth_type_cd.json')

import { getJSONData } from '../common'

const priorAuthorizationServices = {

  /*
    string provider_id,
    string start_dt,
    string end_dt,
    string pcc

    get_auth_list_using_provider
  */
  findByProvider(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_list_by_provider.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_auth_list_using_provider'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  /*
   string member_id,
   string person_cd,
   string start_dt,
   string end_dt,
   string pcc

   get_auth_list_using_member
   */
  findByMember(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_list_by_provider.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_auth_list_using_member'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },


  /*
  string start_dt,
  string end_dt,
  string pcc

   get_auth_list_using_process
 */
  findProcessedBetween(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_list_by_provider.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_auth_list_using_process'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },


  /*
  string auth_num
  string pcc

  get_authorization
   */
  findByAuthNumber(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_list_by_provider.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_authorization'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },


  /*
  string session_uid,
  string session_id,
  string auth_type_cd,
  string pcc,
  string provider_id,
  string member_id,
  string person_cd,
  string ndc,
  int tier,
  string effect_dt,
  string exp_dt,
  int max_days_supply_amt,
  double max_claim_amt,
  int max_qty_dispense_amt,
  string static_flg,
  string comment_txt,
  int did

  add_authorization
  */
  addPriorAuth(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/add_authorization'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  /*
  string session_uid,
  string session_id,
  string auth_type_cd,
  string pcc,
  string original_auth_num,
  string auth_num,
  string provider_id,
  string member_id,
  string person_cd,
  string ndc,
  int tier,
  string effect_dt,
  string exp_dt,
  int max_days_supply_amt,
  double max_claim_amt,
  int max_qty_dispense_amt,
  string static_flg,
  string comment_txt,
  int did

  update_authorization
  */

  updateAuth(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/update_authorization'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)

  },

  getAuthTypeCd(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_auth_type_cd.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_auth_type_cd'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  }
}
export default priorAuthorizationServices
