'use strict'

// local data
require ('../../../data/return.json')
require ('../../../data/provider/get_mpp_data.json')
require ('../../../data/drugs/get_drug_class_name_list.json')
require ('../../../data/drugs/get_selected_drug_list.json')
require ('../../../data/drugs/get_hmac_list.json')
require ('../../../data/drugs/get_drug_data.json')
require ('../../../data/drugs/get_group_mac_list.json')
require ('../../../data/drugs/get_mac_drug_list.json')
require ('../../../data/drugs/get_mac_drug.json')
// require ('../../../data/drugs/get_group_plan_mac.json')

import { getJSONData } from '../common'

const drugServices = {
// get_drug_class_name_list
  getDrugClassNameList: function() {
    const dataUrl = '/static/api/get_drug_class_name_list.json'
    const apiUrl = 'webservices.asmx/get_drug_class_name_list'
    return getJSONData(dataUrl, apiUrl, {})
  },
  getGroupMacList: function(data) {
    const dataUrl = '/static/api/get_group_mac_list.json'
    const apiUrl = 'webservices.asmx/get_group_mac_list'
    return getJSONData(dataUrl, apiUrl, data)
  },
  getDrugDataWthDnc: function(data) {
    const dataUrl = '/static/api/get_drug_data.json'
    const apiUrl = 'webservices.asmx/get_drug_data'
    return getJSONData(dataUrl, apiUrl, data)
  },
  getSelectedDrugList: function(data) {
    const dataUrl = '/static/api/get_selected_drug_list.json'
    const apiUrl = 'webservices.asmx/get_selected_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },
  getDrugData: function (data) {
    const dataUrl = '/static/api/get_selected_drug_list.json'
    const apiUrl = 'webservices.asmx/get_drug_pricing_data'
    return getJSONData(dataUrl, apiUrl, data)
  },
  getHmacList: function (data) {
    const dataUrl = '/static/api/get_hmac_list.json'
    const apiUrl = 'webservices.asmx/get_hmac_list'
    return getJSONData(dataUrl, apiUrl, data)
  },
  getMacDrugList: function (data) {
    const dataUrl = '/static/api/get_mac_drug_list.json'
    const apiUrl = 'webservices.asmx/get_mac_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },
  get_spec_comp_drug_data: function (data) {
    const dataUrl = '/static/api/get_spec_comp_drug_data.json'
    const apiUrl = 'webservices.asmx/get_spec_comp_drug_data'
    return getJSONData(dataUrl, apiUrl, data)
  },
  // Get Mac Drug
  getMacDrug: function (macId, drugId, quantity) {
    const dataUrl = '/static/api/get_mac_drug.json'
    const apiUrl = 'webservices.asmx/get_mac_drug'
    const data = {
      mac_id: macId,
      drug_id: drugId,
      quantity: quantity
    }
    return getJSONData(dataUrl, apiUrl, data)
  },
  // Delete Mac Drug List
  deleteMacDrugList: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_mac_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  UpdateHMACList: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_hmac'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateMacDrug: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_mac_drug'
    const data = {
      mac_id: info.mac_id,
      drug_id_type_cd: info.drug_id_type_cd || '',
      drug_id: info.drug_id || '',
      current_quantity: parseFloat(info.quantity) || 0,
      old_quantity: parseFloat(info.old_quantity)|| 0,
      drug_name_txt: info.drug_name_txt,
      drug_type_cd: info.drug_type_cd || '',
      status_cd: info.status_cd,
      unit_price_amt: info.unit_price_amt || 0,
      drug_tier: info.drug_tier || -1,
      msg_txt: info.msg_txt || '',
      updated_by: user
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addMacDrug: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_mac_drug'
    const data = {
      mac_id: info.mac_id,
      drug_id_type_cd: info.drug_id_type_cd || '',
      drug_id: info.drug_id || '',
      quantity: info.quantity || 0,
      drug_name_txt: info.drug_name_txt,
      drug_type_cd: info.drug_type_cd,
      status_cd: info.status_cd,
      unit_price_amt: info.unit_price_amt || 0,
      drug_tier: info.drug_tier,
      msg_txt: info.msg_txt || '',
      created_by: user
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addDrug: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_drug'
    const data = {
      session_uid: user.session_uid || '',
      session_id: user.session_id || '',
      hcpcs: info.hcpcs || '',
      pcc: pcc || '',
      group_id: info.group_id || [0],
      drug_type_cd: info.drug_type_cd || '',
      ndc: info.ndc || '',
      mfg_name_txt: info.mfg_name_txt || '',
      product_name_txt: info.product_name_txt || '',
      additional_desc_txt: info.additional_desc_txt || '',
      product_type_cd: info.product_type_cd || '',
      roa_cd: info.roa_cd || '',
      form_cd: info.form_cd || '',
      master_form_cd: info.form_cd || '',
      dea_class_cd: info.dea_class_cd || '',
      strength_txt: info.strength_txt || '',
      single_src_ind: info.single_src_ind || '',
      form_type_cd: info.form_type_cd || '',
      maint_drug_ind: info.maint_drug_ind || '',
      std_uom_cd: info.std_uom_cd || '',
      measure_cd: info.measure_cd || '',
      awp_curr_unit_price_amt: info.awp_curr_unit_price_amt || 0,
      awp_curr_price_effect_dt: (new Date(info.awp_curr_price_effect_dt)).toLocaleDateString(),
      dp_curr_unit_price_amt: info.dp_curr_unit_price_amt || 0,
      dp_curr_price_effect_dt: (new Date(info.dp_curr_price_effect_dt)).toLocaleDateString(),
      mac_curr_unit_price_amt: info.mac_curr_unit_price_amt || 0,
      mac_curr_price_effect_dt: (new Date(info.mac_curr_price_effect_dt)).toLocaleDateString(),
      wac_curr_unit_price_amt: info.wac_curr_unit_price_amt || 0,
      wac_curr_price_effect_dt: (new Date(info.wac_curr_price_effect_dt)).toLocaleDateString(),
      hcpcsMod1: info.hcpcsMod1 || '',
      hcpcsMod2: info.hcpcsMod2 || '',
      hcpcsMod3: info.hcpcsMod3 || '',
      hcpcsStartDt: info.hcpcsStartDt || (new Date()).toLocaleDateString(),
      hcpcsEndDt: info.hcpcsEndDt || '12/31/9998',
      localUse: info.localUse || '',
      priorAuthInd: info.priorAuthInd || '',
      invoiceInd: info.invoiceInd || '',
      conversionInd: info.conversionInd || 0,
      conversionFactor: info.conversionFactor || 0,
      minAge: info.minAge || 1,
      maxAge: info.maxAge || 2,
      minQty: info.minQty || 0,
      maxQty: info.maxQty || 0,
      quantity: info.quantity || 0
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

}

export default drugServices
