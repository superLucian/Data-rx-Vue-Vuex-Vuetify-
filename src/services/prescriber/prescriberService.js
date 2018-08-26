'use strict'
require('../../../data/prescriber/prescriber_list_by_prescriber_id.json')
require('../../../data/prescriber/prescriber_list_by_prescriber_name.json')
require('../../../data/prescriber/get_prescriber.json')
require('../../../data/return.json')
import { getJSONData } from '../common'

const prescriberServices = {
  /*
   string session_uid,
   string session_id,
   string pcc,
   string npi,
   string fname,
   string mname,
   string lname,
   string title_txt,
   string upin,
   string spin,
   string fed_license_num,
   string state_license_num,
   string addr1_txt,
   string addr2_txt,
   string city_txt,
   string state_cd,
   string zip_cd,
   string phone_num,
   string fax_num,
   string email_addr_txt,
   string comment_txt
   */

  addPrescriber: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_prescriber'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      npi: info.npi,
      fname: info.fname,
      mname: info.mname,
      lname: info.lname,
      title_txt: info.title_txt,
      upin: info.upin,
      spin: info.spin,
      fed_license_num: info.fed_license_num,
      state_license_num: info.state_license_num,
      addr1_txt: info.addr1_txt,
      addr2_txt: info.addr2_txt,
      city_txt: info.city_txt,
      state_cd: info.state_cd,
      zip_cd: info.zip_cd,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      comment_txt: info.comment_txt,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  /*
   string session_uid,
   string session_id,
   string pcc,
   string lname,
   string fname
   */

  getPrescriberListByPrescriberName: function (data) {
    const dataUrl = '/static/api/prescriber_list_by_prescriber_name.json'
    const apiUrl = 'webservices.asmx/get_prescriber_list_by_prescriber_name'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getPrescriber: function (data) {
    const dataUrl = '/static/api/get_prescriber.json'
    const apiUrl = 'webservices.asmx/get_prescriber'
    return getJSONData(dataUrl, apiUrl, data)
  },

  /*
   string session_uid,
   string session_id,
   string pcc,
   string npi
   */

  getPrescriberListByPrescriberId: function (data) {
    const dataUrl = '/static/api/prescriber_list_by_prescriber_id.json'
    const apiUrl = 'webservices.asmx/get_prescriber_list_by_prescriber_id'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updatePrescriber: function (info, user, pcc, did) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_prescriber'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      did: did,
      fname: info.fname,
      mname: info.mname,
      lname: info.lname,
      title_txt: info.title_txt,
      upin: info.upin || '',
      spin: info.spin || '',
      fed_license_num: info.fed_license_num || '',
      state_license_num: info.state_license_num || '',
      addr1_txt: info.addr1_txt,
      addr2_txt: info.addr2_txt,
      city_txt: info.city_txt,
      state_cd: info.state_cd,
      zip_cd: info.zip_cd,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt || '',
      comment_txt: info.comment_txt || ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },
}
export default prescriberServices
