'use strict'
// local data
require('../../../data/formulary/get_formulary_listing.json')
require('../../../data/formulary/get_formulary_drug_list.json')
require('../../../data/formulary/get_drug_type_cd_list.json')
require('../../../data/formulary/get_term_cd_list.json')
require('../../../data/formulary/get_formulary_drug.json')

import { getJSONData } from '../common'

const formularyServices = {
  // Get Formulary List
  getFormularyList: function (data) {
    const dataUrl = '/static/api/get_formulary_listing.json'
    const apiUrl = 'webservices.asmx/get_formulary_listing'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Formulary Drug List
  getFormularyDrugList: function (data) {
    const dataUrl = '/static/api/get_formulary_drug_list.json'
    const apiUrl = 'webservices.asmx/get_formulary_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Drug Type Code List
  getDrugTypeList: function (data) {
    const dataUrl = '/static/api/get_drug_type_cd_list.json'
    const apiUrl = 'webservices.asmx/get_drug_type_cd_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Term Code List
  getTermCodeList: function (data) {
    const dataUrl = '/static/api/get_term_cd_list.json'
    const apiUrl = 'webservices.asmx/get_term_cd_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Formulary Drug
  getFormularyDrug: function (data) {
    const dataUrl = '/static/api/get_formulary_drug.json'
    const apiUrl = 'webservices.asmx/get_formulary_drug'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Formulary Drug
  updateFormularyDrug: function (info, oldInfo, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_formulary_drug'
    const data = {
      form_id: info.form_id,
      drug_id_type_cd: info.drug_id_type_cd,
      drug_id: info.drug_id,
      drug_desc_txt: info.drug_desc_txt,
      drug_type_cd: oldInfo.drug_type_cd,
      new_drug_type_cd: info.drug_type_cd,
      product_type_cd: info.product_type_cd,
      network_id: oldInfo.network_id,
      new_network_id: info.network_id,
      tier: info.tier,
      include_exclude_ind: info.include_exclude_ind,
      pa_req_ind: info.pa_req_ind,
      min_qty: info.min_qty || 0,
      max_qty: info.max_qty || 0,
      min_days: info.min_days || 0,
      max_days: info.max_days || 0,
      qty_term_cd: info.qty_term_cd === '-1' ? '' : info.qty_term_cd,
      min_age: info.min_age || 0,
      max_age: info.max_age || 0,
      ds_qty_limit: info.ds_qty_limit || 0,
      gender: info.gender,
      effect_start_dt: oldInfo['Start Date'],
      new_effect_start_dt: info.effect_start_dt,
      effect_end_dt: info.effect_end_dt,
      msg_txt: info.msg_txt,
      uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Formulary Drug
  addFormularyDrug: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_formulary_drug'
    const data = {
      form_id: info.form_id,
      drug_id_type_cd: info.drug_id_type_cd,
      drug_id: info.drug_id,
      drug_desc_txt: info.drug_desc_txt,
      drug_type_cd: info.drug_type_cd,
      product_type_cd: info.product_type_cd,
      network_id: info.network_id,
      tier: info.tier,
      include_exclude_ind: info.include_exclude_ind,
      pa_req_ind: info.pa_req_ind,
      min_qty: info.min_qty || 0,
      max_qty: info.max_qty || 0,
      min_days: info.min_days || 0,
      max_days: info.max_days || 0,
      qty_term_cd: info.qty_term_cd === '-1' ? '' : info.qty_term_cd,
      min_age: info.min_age || 0,
      max_age: info.max_age || 0,
      ds_qty_limit: info.ds_qty_limit || 0,
      gender: info.gender,
      effect_start_dt: info.effect_start_dt,
      effect_end_dt: info.effect_end_dt,
      msg_txt: info.msg_txt,
      uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Formulary Drug
  deleteFormularyDrug: function (info) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_formulary_drug'
    const data = {
      form_id: info['Form ID'],
      drug_id_type_cd: info.drug_id_type_cd,
      drug_id: info['Drug ID'],
      drug_type_cd: info.drug_type_cd,
      network_id: info.network_id,
      effect_start_dt: info['Start Date']
    }
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default formularyServices
