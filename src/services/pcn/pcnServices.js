'use strict'
// local data
require('../../../data/return.json')
require('../../../data/pcn/get_pc_org.json')
require('../../../data/pcn/get_medicaid_edit_type_cd_syscode.json')
require('../../../data/pcn/get_wholesaler_list.json')
require('../../../data/pcn/get_wholesaler_provider_list')

import { getJSONData } from '../common'

const pcnServices = {
  // Get All Medicaid Edit Type List Items Data
  getMedicaidEditTypeList: function (data) {
    const dataUrl = '/static/api/get_medicaid_edit_type_cd_syscode.json'
    const apiUrl = 'webservices.asmx/get_medicaid_edit_type_cd_syscode'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Wholesaler List Items Data
  getWholesalerList: function () {
    const dataUrl = '/static/api/get_wholesaler_list.json'
    const data = {}
    const apiUrl = 'webservices.asmx/get_wholesaler_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Wholesaler Provider List Items Data
  getWholesalerProviderList: function (pcc) {
    const dataUrl = '/static/api/get_wholesaler_provider_list.json'
    const data = {
      pcc: pcc
    }
    const apiUrl = 'webservices.asmx/get_wholesaler_provider_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getPCN: function (pcc) {
    const dataUrl = '/static/api/get_pc_org.json'
    const apiUrl = 'webservices.asmx/get_pc_org'
    const data = {
      pcc: pcc
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  /* Update the existing PCN */
  updatePCN: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_pc_org'
    const data = {
      pcc: pcc,
      status_cd: info.status_cd,
      name_txt: info.name_txt,
      addr1_txt: info.addr1_txt,
      addr2_txt: info.addr2_txt || '',
      city_txt: info.city_txt,
      state_cd: info.state_cd,
      zip_cd: info.zip_cd || '',
      phone_num: info.phone_num || '',
      fax_num: info.fax_num || '',
      email_addr_txt: info.email_addr_txt || '',
      web_url_txt: info.web_url_txt || '',
      contact_lname: info.contact_lname || '',
      contact_fname: info.contact_fname || '',
      contact_addr1_txt: info.contact_addr1_txt || '',
      contact_addr2_txt: info.contact_addr2_txt || '',
      contact_city_txt: info.contact_city_txt || '',
      contact_state_cd: info.contact_state_cd || '',
      contact_zip_cd: info.contact_zip_cd || '',
      contact_phone_num: info.contact_phone_num || '',
      contact_cell_num: info.contact_cell_num || '',
      contact_fax_num: info.contact_fax_num || '',
      contact_pager_num: info.contact_pager_num || '',
      contact_email_addr_txt: info.contact_email_addr_txt || '',
      rebate_level_2: info.rebate_level_2,
      track_benefits_flg: info.track_benefits_flg,
      comment_txt: info.comment_txt || '',
      uid: user.session_uid,
      edit_form_type_cd: info.edit_form_type_cd,
      wholesaler_id: info.wholesaler_id,
      edi_sender_id: info.edi_sender_id,
      edi_task_name: info.edi_task_name,
      reorder_pct: parseInt(info.reorder_pct) || 0,
      retry_count: parseInt(info.retry_count) || 0,
      retry_delay: parseInt(info.retry_delay) || 0,
      base_dir: info.base_dir,
      sent_dir: info.sent_dir,
      order_time_out: parseInt(info.order_time_out) || 0,
      auto_adj_start_dt: info.auto_adj_start_dt,
      medicaid_copay_cap: parseFloat(info.medicaid_copay_cap) || -1,
      medicaid_edit_type_cd: info.medicaid_edit_type_cd
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  /* Add new PCN */
  addPCN: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_pc_org'
    const data = {
      pcc: info.pcc || '',
      status_cd: info.status_cd,
      name_txt: info.name_txt,
      addr1_txt: info.addr1_txt,
      addr2_txt: info.addr2_txt,
      city_txt: info.city_txt,
      state_cd: info.state_cd,
      zip_cd: info.zip_cd,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      web_url_txt: info.web_url_txt,
      contact_lname: info.contact_lname,
      contact_fname: info.contact_fname,
      contact_addr1_txt: info.contact_addr1_txt,
      contact_addr2_txt: info.contact_addr2_txt,
      contact_city_txt: info.contact_city_txt,
      contact_state_cd: info.contact_state_cd,
      contact_zip_cd: info.contact_zip_cd,
      contact_phone_num: info.contact_phone_num,
      contact_cell_num: info.contact_cell_num,
      contact_fax_num: info.contact_fax_num,
      contact_pager_num: info.contact_pager_num,
      contact_email_addr_txt: info.contact_email_addr_txt,
      rebate_level_2: info.rebate_level_2,
      track_benefits_flg: info.track_benefits_flg,
      comment_txt: info.comment_txt,
      uid: user.session_uid,
      edit_form_type_cd: info.edit_form_type_cd,
      wholesaler_id: info.wholesaler_id,
      edi_sender_id: info.edi_sender_id,
      edi_task_name: info.edi_task_name,
      reorder_pct: parseInt(info.reorder_pct) || 0,
      retry_count: parseInt(info.retry_count) || 0,
      retry_delay: parseInt(info.retry_delay) || 0,
      base_dir: info.base_dir,
      sent_dir: info.sent_dir,
      order_time_out: parseInt(info.order_time_out) || 0,
      auto_adj_start_dt: info.auto_adj_start_dt,
      medicaid_copay_cap: parseFloat(info.medicaid_copay_cap) || -1,
      medicaid_edit_type_cd: info.medicaid_edit_type_cd
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addProviderWholesaler: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_provider_wholesaler'
    const data = {
      pcc: pcc,
      pid: info.pid,
      acct_num: info['Account#'],
      uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateProviderWholesaler: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_provider_wholesaler'
    const data = {
      pcc: pcc,
      pid: info.pid,
      acct_num: info['Account#'],
      uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  deleteProviderWholesaler: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_provider_wholesaler'
    const data = {
      pcc: pcc,
      pid: info.pid,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },
}

export default pcnServices
