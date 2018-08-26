'use strict'
// local data
require('../../../data/plan/get_plan_data.json')
require('../../../data/plan/get_plan.json')
require('../../../data/plan/get_plan_setup_data.json')
require('../../../data/plan/get_plan_param_data.json')
require('../../../data/plan/get_plan_param_setup_data.json')
require('../../../data/plan/get_plan_drug_list.json')
require('../../../data/plan/get_plan_drug.json')
require('../../../data/plan/get_product_type_cd_list.json')
require('../../../data/plan/get_plan_formulary_listing.json')
require('../../../data/plan/get_plan_formulary_restrict_listing.json')
require('../../../data/plan/get_formulary_listing.json')
require('../../../data/plan/get_network_list.json')
require('../../../data/plan/get_group_plan_network.json')
require('../../../data/plan/get_group_plan_mac_list.json')
require('../../../data/plan/get_group_plan_network_list.json')
require('../../../data/plan/get_network_provider_list.json')
require('../../../data/plan/get_chain_list_using_networkid.json')
require('../../../data/plan/get_contract_list.json')
require('../../../data/plan/get_network_chain.json')
require('../../../data/plan/get_sex_cd_list.json')

import {getJSONData} from '../common'

const planServices = {
  // Get All Plan List Data
  getAllPlanLists: function (data) {
    const dataUrl = '/static/api/get_plan_data.json'
    const apiUrl = 'webservices.asmx/get_plan_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Data
  getPlan: function (data) {
    const dataUrl = '/static/api/get_plan.json'
    const apiUrl = 'webservices.asmx/get_plan'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Setup Data
  getSetupPlan: function (data) {
    const dataUrl = '/static/api/get_plan_setup_data.json'
    const apiUrl = 'webservices.asmx/get_plan_setup_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Param Data
  getParamPlan: function (groupId, planId, networkId) {
    const dataUrl = '/static/api/get_plan_param_data.json'
    const apiUrl = 'webservices.asmx/get_plan_param_data'
    const data = {
      group_id: groupId,
      plan_id: planId,
      network_id: networkId
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Param Setup Data
  getParamSetupData: function (groupId) {
    const dataUrl = '/static/api/get_plan_param_setup_data.json'
    const apiUrl = 'webservices.asmx/get_plan_param_setup_data'
    const data = {
      group_id: groupId
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Formulary List
  getPlanFormularyList: function (data) {
    const dataUrl = '/static/api/get_plan_formulary_listing.json'
    const apiUrl = 'webservices.asmx/get_plan_formulary_listing'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Formulary Listing
  getFormularyListing: function (data) {
    const dataUrl = '/static/api/get_formulary_listing.json'
    const apiUrl = 'webservices.asmx/get_formulary_listing'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Formulary Restrictions List
  getPlanFormularyRestrictionsList: function (data) {
    const dataUrl = '/static/api/get_plan_formulary_restrict_listing.json'
    const apiUrl = 'webservices.asmx/get_plan_formulary_restrict_listing'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Network Data
  getNetworkList: function (data) {
    const dataUrl = '/static/api/get_network_list.json'
    const apiUrl = 'webservices.asmx/get_network_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Group Plan Network List
  getGroupPlanNetworkList: function (data) {
    const dataUrl = '/static/api/get_group_plan_network_list.json'
    const apiUrl = 'webservices.asmx/get_group_plan_network_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Gender Data
  getGenderList: function (data = null) {
    const dataUrl = '/static/api/get_sex_cd_list.json'
    const apiUrl = 'webservices.asmx/get_sex_cd_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Group Plan Network
  getGroupPlanNetwork: function (data) {
    const dataUrl = '/static/api/get_group_plan_network.json'
    const apiUrl = 'webservices.asmx/get_group_plan_network'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Drug List
  getPlanDruglist: function (data) {
    const dataUrl = '/static/api/get_plan_drug_list.json'
    const apiUrl = 'webservices.asmx/get_plan_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Drug Data
  getPlanDrugData: function (data) {
    const dataUrl = '/static/api/get_plan_drug.json'
    const apiUrl = 'webservices.asmx/get_plan_drug'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Network Provider List
  getNetworkProviderList: function (data) {
    const dataUrl = '/static/api/get_network_provider_list.json'
    const apiUrl = 'webservices.asmx/get_network_provider_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Network Chain List
  getNetworkChainList: function (data) {
    const dataUrl = '/static/api/get_chain_list_using_networkid.json'
    const apiUrl = 'webservices.asmx/get_chain_list_using_networkid'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Network Chain
  getNetworkChain: function (chainId, networkId) {
    const dataUrl = '/static/api/get_network_chain.json'
    const apiUrl = 'webservices.asmx/get_network_chain'
    const data = {
      network_id: networkId,
      chain_id: chainId
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Network Contract List
  getContractList: function (data) {
    const dataUrl = '/static/api/get_contract_list.json'
    const apiUrl = 'webservices.asmx/get_contract_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan Drug Data
  getProductTypeList: function (data) {
    const dataUrl = '/static/api/get_product_type_cd_list.json'
    const apiUrl = 'webservices.asmx/get_product_type_cd_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // update Plan
  updatePlan: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_plan'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      plan_type_cd: info.plan_type_cd,
      effect_start_dt: (new Date(info.effect_start_dt)).toLocaleDateString(),
      effect_end_dt: (new Date(info.effect_end_dt)).toLocaleDateString(),
      status_cd: info.status_cd,
      plan_desc_txt: info.plan_desc_txt,
      max_claim_file_day_cnt: info.max_claim_file_day_cnt,
      max_refills_covered_cnt: info.max_refills_covered_cnt,
      rollover_period_cd: info.rollover_period_cd,
      rollover_dt: (new Date(parseInt(info.rollover_dt.substring(6, 19)))).toLocaleDateString(),
      network_id: info.network_id,
      contract_dt: (new Date(info.contract_dt)).toLocaleDateString(),
      agent_id: info.agent_id,
      commission_amt: info.commission_amt,
      support_uid: info.support_uid,
      daw_cd: info.daw_cd,
      copay_type_cd: info.copay_type_cd,
      fixed_copay_pct: info.fixed_copay_pct / 100,
      member_pay_cd: info.member_pay_cd,
      reimbursement_cd: info.reimbursement_cd,
      uc_lower_ingred_cost_ind: info.uc_lower_ingred_cost_ind,
      uc_lower_awp_disc_ind: info.uc_lower_awp_disc_ind,
      uc_lower_generic_awp_disc_ind: info.uc_lower_generic_awp_disc_ind,
      uc_lower_mac_disc_ind: info.uc_lower_mac_disc_ind,
      uc_lower_uc_ind: info.uc_lower_uc_ind,
      compound_dispense_fee_amt: parseFloat(info.compound_dispense_fee_amt).toFixed(2),
      compound_max_amt: parseFloat(info.compound_max_amt).toFixed(2),
      wrx_pricing_tier: info.wrx_pricing_tier || 0,
      dependent_age_restrict_ind: info.dependent_age_restrict_ind,
      nonstudent_age_limit: info.nonstudent_age_limit || 0,
      student_age_limit: info.student_age_limit || 0,
      disabled_age_limit: info.disabled_age_limit || 0,
      dep_adult_age_limit: info.dep_adult_age_limit || 0,
      max_family_deduct_amt: info.max_family_deduct_amt || 0,
      max_member_deduct_amt: info.max_member_deduct_amt || 0,
      max_family_claim_amt: info.max_family_claim_amt || 0,
      max_member_claim_amt: info.max_member_claim_amt || 0,
      max_family_oop_amt: info.max_family_oop_amt || 0,
      max_member_oop_amt: info.max_member_oop_amt || 0,
      comment_txt: info.comment_txt,
      open_member: info.open_member,
      open_formulary: info.open_formulary,
      alt_id_req: info.alt_id_required,
      external_pa_ind: info.external_pa_ind,
      uc_lower_gad_ind: info.uc_lower_gad_ind,
      off_form_action: info.off_form_action,
      generic_required_flg: info.generic_required,
      off_pdl_warning_flg: info.off_pdl_warning_flg || 'F',
      required_fields: (info.required_fields).toUpperCase() || '',
      field_edits: info.field_edits || '',
      open_enrollment_flg: info.open_enrollment_flg,
      open_prescriber_flg: info.open_prescriber_flg,
      open_provider_flg: info.open_provider_flg,
      allow_repacks_flg: info.allow_repacks_flg,
      use_lower_of_logic_flg: info.use_lower_of_logic_flg,
      open_enroll24: info.open_enrollment_cd || '',
      compound_covered_ind: info.compound_covered_ind,
      compound_use_pricing_params_ind: info.compound_use_pricing_params_ind,
      compound_use_group_mac_ind: info.compound_use_group_mac_ind,
      compound_use_lower_uc_ind: info.compound_use_lower_uc_ind,
      compound_use_lower_gad_ind: info.compound_use_lower_gad_ind,
      compound_copay_type_cd: info.compound_copay_type_cd,
      compound_copay_amt: info.compound_copay_amt || 0,
      compound_copay_pct: info.compound_copay_pct || 0,
      compound_copay_tier: info.compound_copay_tier || 0,
      mandatory_mail_ind: info.mandatory_mail_ind,
      retail_script_cnt_limit: info.retail_script_cnt_limit,
      transparency_flg: info.transparency_flg,
      retail_script_cnt_term_cd: info.retail_script_cnt_term_cd,
      delta_cap_pct: info.delta_cap_pct || 0,
      delta_cap_diff: info.delta_cap_diff || 0,
      delta_cap_min: info.delta_cap_min || 0,
      dur_flg: info.dur_flg || '',
      track_benefits_flg: info.track_benefits_flg,
      use_senior_disc_flg: info.use_senior_disc_flg,
      member_id_prefix: info.member_id_prefix || '',
      script_cnt_limit: info.script_cnt_limit || 0,
      script_cnt_term_cd: info.script_cnt_term_cd || -1,
      formulary_mgr: info.formulary_mgr || -1,
      base_formulary: info.base_formulary || -1,
      rebate_level_1: info.rebate_level_1 || -1,
      rebate_level_3: info.rebate_level_3 || '',
      rebate_copay_diff_flg: info.rebate_copay_diff_flg || '',
      prebate_flg: info.prebate_flg,
      benefit_tier: info.benefit_tier,
      use_group_mpp_ind: info.use_group_mpp_ind,
      prescriber_cnt_limit: info.prescriber_cnt_limit || -1,
      person_cd_lookup_ind: info.person_cd_lookup_ind,
      per_diem_amt: info.per_diem_amt,
      narcotic_refill_pct: info.narcotic_refill_pct,
      member_card_report_id: info.member_card_report_id
    }
    // console.log(data)
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateGroupPlanNetwork: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_group_plan_network'
    const data = {
      network_id: info.network_id,
      group_id: info['Group ID'],
      plan_id: info['Plan ID'],
      min_claim_amt: info.min_claim_amt || '0',
      daw_cd: info.daw_cd || '',
      use_pricing_params_ind: info.use_pricing_params_ind || '',
      use_brand_mac_ind: info.use_brand_mac_ind || '',
      use_generic_mac_ind: info.use_generic_mac_ind || '',
      use_group_mac_ind: info.use_group_mac_ind || '',
      use_group_mpp_ind: info.use_group_mpp_ind || '',
      use_lower_uc_ind: info.use_lower_uc_ind || '',
      use_lower_gad_ind: info.use_lower_gad_ind || '',
      use_lower_of_logic_flg: info.use_lower_of_logic_flg || '',
      uid: user.session_uid,
      compound_covered_ind: info.compound_covered_ind || '',
      compound_copay_tier: info.compound_copay_tier || -99,
      plan_type_cd: info.plan_type_cd || '',
      use_submitted_ind: info.use_submitted_ind || '',
      comment_txt: info.comment_txt || ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Plan Network Chain
  updateNetworkChain: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_network_chain'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Plan Network Chain
  addNetworkChain: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_network_chain'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Group Plan Network
  addGroupPlanNetwork: function (data) {
    const dataUrl = '/static/api/return.json'

    const apiUrl = 'webservices.asmx/add_group_plan_network'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add Plan
  addPlan: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_plan'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      plan_type_cd: info.plan_type_cd,
      effect_start_dt: (new Date(info.effect_start_dt)).toLocaleDateString(),
      effect_end_dt: (new Date(info.effect_end_dt)).toLocaleDateString(),
      status_cd: info.status_cd,
      plan_desc_txt: info.plan_desc_txt,
      max_claim_file_day_cnt: info.max_claim_file_day_cnt || 0,
      max_refills_covered_cnt: info.max_refills_covered_cnt || 0,
      rollover_period_cd: info.rollover_period_cd,
      rollover_dt: (new Date()).toLocaleDateString(),
      network_id: info.network_id || 0,
      contract_dt: (new Date(info.contract_dt)).toLocaleDateString(),
      agent_id: info.agent_id || 0,
      commission_amt: info.commission_amt || 0,
      support_uid: info.support_uid,
      daw_cd: info.daw_cd,
      copay_type_cd: info.copay_type_cd,
      fixed_copay_pct: info.fixed_copay_pct || 0,
      member_pay_cd: info.member_pay_cd,
      reimbursement_cd: info.reimbursement_cd,
      uc_lower_ingred_cost_ind: info.uc_lower_ingred_cost_ind,
      uc_lower_awp_disc_ind: info.uc_lower_awp_disc_ind,
      uc_lower_generic_awp_disc_ind: info.uc_lower_generic_awp_disc_ind,
      uc_lower_mac_disc_ind: info.uc_lower_mac_disc_ind,
      uc_lower_uc_ind: info.uc_lower_uc_ind,
      compound_dispense_fee_amt: parseFloat(info.compound_dispense_fee_amt).toFixed(2),
      compound_max_amt: parseFloat(info.compound_max_amt).toFixed(2),
      wrx_pricing_tier: info.wrx_pricing_tier || 0,
      dependent_age_restrict_ind: info.dependent_age_restrict_ind,
      nonstudent_age_limit: info.nonstudent_age_limit || 0,
      student_age_limit: info.student_age_limit || 0,
      disabled_age_limit: info.disabled_age_limit || 0,
      dep_adult_age_limit: info.dep_adult_age_limit || 0,
      max_family_deduct_amt: info.max_family_deduct_amt || 0,
      max_member_deduct_amt: info.max_member_deduct_amt || 0,
      max_family_claim_amt: info.max_family_claim_amt || 0,
      max_member_claim_amt: info.max_member_claim_amt || 0,
      max_family_oop_amt: info.max_family_oop_amt || 0,
      max_member_oop_amt: info.max_member_oop_amt || 0,
      comment_txt: info.comment_txt,
      open_membership: info.open_member,
      open_formulary: info.open_formulary,
      alt_id_req: info.alt_id_required,
      external_pa_ind: info.external_pa_ind,
      uc_lower_gad_ind: info.uc_lower_gad_ind,
      off_form_action: info.off_form_action,
      generic_required_flg: info.generic_required,
      off_pdl_warning_flg: info.off_pdl_warning_flg,
      required_fields: info.required_fields || '',
      field_edits: info.field_edits || '',
      open_enrollment_flg: info.open_enrollment_flg,
      open_prescriber_flg: info.open_prescriber_flg,
      open_provider_flg: info.open_provider_flg,
      allow_repacks_flg: info.allow_repacks_flg,
      use_lower_of_logic_flg: info.use_lower_of_logic_flg,
      open_enroll24: info.open_enrollment_cd || '',
      compound_covered_ind: info.compound_covered_ind,
      compound_use_pricing_params_ind: info.compound_use_pricing_params_ind,
      compound_use_group_mac_ind: info.compound_use_group_mac_ind,
      compound_use_lower_uc_ind: info.compound_use_lower_uc_ind,
      compound_use_lower_gad_ind: info.compound_use_lower_gad_ind,
      compound_copay_type_cd: info.compound_copay_type_cd,
      compound_copay_amt: info.compound_copay_amt || 0,
      compound_copay_pct: info.compound_copay_pct || 0,
      compound_copay_tier: info.compound_copay_tier || 0,
      mandatory_mail_ind: info.mandatory_mail_ind,
      retail_script_cnt_limit: info.retail_script_cnt_limit || 0,
      transparency_flg: info.transparency_flg,
      retail_script_cnt_term_cd: info.retail_script_cnt_term_cd,
      delta_cap_pct: info.delta_cap_pct || -1,
      delta_cap_diff: info.delta_cap_diff || -1,
      delta_cap_min: info.delta_cap_min || -1,
      dur_flg: info.dur_flg || '',
      track_benefits_flg: info.track_benefits_flg,
      use_senior_disc_flg: info.use_senior_disc_flg,
      member_id_prefix: info.member_id_prefix || '',
      script_cnt_limit: info.script_cnt_limit || -1,
      script_cnt_term_cd: info.script_cnt_term_cd || -1,
      formulary_mgr: info.formulary_mgr || -1,
      base_formulary: info.base_formulary || -1,
      rebate_level_1: info.rebate_level_1 || -1,
      rebate_level_3: info.rebate_level_3 || '',
      rebate_copay_diff_flg: info.rebate_copay_diff_flg || '',
      prebate_flg: info.prebate_flg,
      benefitTier: info.benefit_tier,
      use_group_mpp_ind: info.use_group_mpp_ind,
      prescriber_cnt_limit: info.prescriber_cnt_limit || 0,
      person_cd_lookup_ind: info.person_cd_lookup_ind,
      per_diem_amt: info.per_diem_amt || 0,
      narcotic_refill_pct: info.narcotic_refill_pct || 0,
      member_card_report_id: info.member_card_report_id || 0
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Plan Drug
  updatePlanDrug: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_plan_drug'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan Param : "Pricing Parameters"
  deletePlanParam: function (info, user, pcc, networkid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_plan_param'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      network_id: networkid,
      product_type_cd: info['Product Type Code'],
      single_src_ind: info['Single Source']
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Plan Param : "Pricing Parameters"
  updatePlanParam: function (info, user, pcc, networkid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_plan_param'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      network_id: networkid,
      product_type_cd: info['Product Type Code'],
      curr_single_src_ind: info.originalProductSrcType,
      new_single_src_ind: info['Single Source'],
      status_cd: info['Status Code'],
      desc_txt: info['Plan Param Desc'],
      price_cd: info['Price Code'],
      price_disc_pct: parseFloat(info['Price Discount Pct']),
      dispense_fee_amt: parseFloat(info['Dispensing Fee']),
      incentive_fee_amt: parseFloat(info['Incentive Fee']),
      svc_fee_amt: parseFloat(info['Service Fee']),
      admin_fee_amt: parseFloat(info['Admin Fee']),
      other_fee_amt: parseFloat(info['Other Fee']),
      prior_auth_req_amt: parseFloat(info['Prior Authorization Amt']),
      allow_refill_pct: parseFloat(info['Allow Refill Pct']),
      max_rx_fill_type_cd: info['Max Rx Fill Type Code'],
      max_rx_fill_cnt: info['Max Rx Fill Count'],
      max_rx_fill_days_cnt: info['Max Rx Fill Days Count'],
      mac_id: info['MAC Id'],
      mm_max_days_supply_ea_cnt: parseInt(info['Maintenance Med Max Days Supply EA Count']),
      mm_max_days_supply_gm_amt: parseInt(info['Maintenance Med Max Days Supply GM Amt']),
      mm_max_days_supply_ml_amt: parseInt(info['Maintenance Med Max Days Supply ML Amt']),
      mm_max_qty_ea_cnt: parseInt(info['Maintenance Med Max Quantity EA Count']),
      mm_max_qty_gm_amt: parseInt(info['Maintenance Med Max Quantity GM Amt']),
      mm_max_qty_ml_amt: parseInt(info['Maintenance Med Max Quantity ML Amt']),
      am_max_days_supply_ea_cnt: parseInt(info['Acute Med Max Days Supply EA Count']),
      am_max_days_supply_gm_amt: parseInt(info['Acute Med Max Days Supply GM Amt']),
      am_max_days_supply_ml_amt: parseInt(info['Acute Med Max Days Supply ML Amt']),
      am_max_qty_ea_cnt: parseInt(info['Acute Med Max Quantity EA Count']),
      am_max_qty_gm_amt: parseInt(info['Acute Med Max Quantity GM Amt']),
      am_max_qty_ml_amt: parseInt(info['Acute Med Max Quantity ML Amt']),
      comment_txt: info['Comments']
    }
    return getJSONData(dataUrl, apiUrl, data)
  },


  updatePlanFormulary: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_plan_formulary'
    const data = {
      group_id: info['group_id'],
      plan_id: info['plan_id'],
      network_id: parseInt(info['network_id']) || -1,
      new_network_id: parseInt(info['new_network_id']) || -1,
      form_id: parseInt(info['Form ID']) || 0,
      effect_start_dt: info['Start Date'] || (new Date()).toLocaleDateString(),
      effect_end_dt: info['End Date'] || '12/31/9998',
      tier: parseInt(info['Tier']) || -1,
      include_exclude_ind: info['Include/Exclude'] || 'Include',
      pa_req_ind: info['PA Required'] || 'No',
      session_uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addPlanFormulary: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_plan_formulary'
    const data = {
      group_id: info['group_id'],
      plan_id: info['plan_id'],
      network_id: parseInt(info['network_id']) || -1,
      new_network_id: parseInt(info['new_network_id']) || -1,
      form_id: parseInt(info['Form ID']) || 0,
      effect_start_dt: info['Start Date'] || (new Date()).toLocaleDateString(),
      effect_end_dt: info['End Date'] || '12/31/9998',
      tier: parseInt(info['Tier']) || -1,
      include_exclude_ind: info['Include/Exclude'] || 'Include',
      pa_req_ind: info['PA Required'] || 'No',
      session_uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  updatePlanFormularyRestrictions: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_plan_formulary_restrict'
    const data = {
      group_id: info['group_id'],
      plan_id: info['plan_id'],
      network_id: parseInt(info['network_id']) || -1,
      pa_req_ind: info['PA Required'] || 'No',
      form_id: parseInt(info['Form ID']),
      min_qty: parseInt(info['Min QTY']) || 0,
      max_qty: parseInt(info['Max QTY']) || 0,
      min_days: parseInt(info['Min Days']) || 0,
      max_days: parseInt(info['Max Days']) || 0,
      qty_term_cd: info['QTY Term'] || -1,
      min_age: parseInt(info['Min Age']) || 0,
      max_age: parseInt(info['Max Age']) || 0,
      ds_qty_limit: info['Days QTY Limit'] || 0,
      gender: info['Gender'] || -1,
      new_effect_start_dt: info['Start Date'] || (new Date()).toLocaleDateString(),
      effect_start_dt: info['Start Date'] || (new Date()).toLocaleDateString(),
      effect_end_dt: info['End Date'] || '12/31/9998',
      msg_txt: info['Message Text'] || '',
      session_uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addPlanFormularyRestrictions: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_plan_formulary_restrict'
    const data = {
      group_id: info['group_id'],
      plan_id: info['plan_id'],
      network_id: parseInt(info['network_id']) || -1,
      pa_req_ind: info['PA Required'] || 'No',
      form_id: parseInt(info['Form ID']),
      min_qty: parseInt(info['Min QTY']) || 0,
      max_qty: parseInt(info['Max QTY']) || 0,
      min_days: parseInt(info['Min Days']) || 0,
      max_days: parseInt(info['Max Days']) || 0,
      qty_term_cd: info['QTY Term'] || -1,
      min_age: parseInt(info['Min Age']) || 0,
      max_age: parseInt(info['Max Age']) || 0,
      ds_qty_limit: info['Days QTY Limit'] || 0,
      gender: info['Gender'] || -1,
      effect_start_dt: info['Start Date'] || (new Date()).toLocaleDateString(),
      effect_end_dt: info['End Date'] || '12/31/9998',
      msg_txt: info['Message Text'] || '',
      session_uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Plan Drug
  addPlanDrug: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_plan_drug'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Plan Param : "Pricing Parameters"
  addPlanParam: function (info, user, pcc, networkid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_plan_param'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      network_id: networkid,
      product_type_cd: info['Product Type Code'],
      single_src_ind: info['Single Source'],
      status_cd: info['Status Code'],
      desc_txt: info['Plan Param Desc'],
      price_cd: info['Price Code'],
      price_disc_pct: parseFloat(info['Price Discount Pct']),
      dispense_fee_amt: parseFloat(info['Dispensing Fee']),
      incentive_fee_amt: parseFloat(info['Incentive Fee']),
      svc_fee_amt: parseFloat(info['Service Fee']),
      admin_fee_amt: parseFloat(info['Admin Fee']),
      other_fee_amt: parseFloat(info['Other Fee']),
      prior_auth_req_amt: parseFloat(info['Prior Authorization Amt']),
      allow_refill_pct: parseFloat(info['Allow Refill Pct']),
      max_rx_fill_type_cd: info['Max Rx Fill Type Code'],
      max_rx_fill_cnt: info['Max Rx Fill Count'],
      max_rx_fill_days_cnt: info['Max Rx Fill Days Count'],
      mac_id: info['MAC Id'],
      mm_max_days_supply_ea_cnt: parseInt(info['Maintenance Med Max Days Supply EA Count']),
      mm_max_days_supply_gm_amt: parseInt(info['Maintenance Med Max Days Supply GM Amt']),
      mm_max_days_supply_ml_amt: parseInt(info['Maintenance Med Max Days Supply ML Amt']),
      mm_max_qty_ea_cnt: parseInt(info['Maintenance Med Max Quantity EA Count']),
      mm_max_qty_gm_amt: parseInt(info['Maintenance Med Max Quantity GM Amt']),
      mm_max_qty_ml_amt: parseInt(info['Maintenance Med Max Quantity ML Amt']),
      am_max_days_supply_ea_cnt: parseInt(info['Acute Med Max Days Supply EA Count']),
      am_max_days_supply_gm_amt: parseInt(info['Acute Med Max Days Supply GM Amt']),
      am_max_days_supply_ml_amt: parseInt(info['Acute Med Max Days Supply ML Amt']),
      am_max_qty_ea_cnt: parseInt(info['Acute Med Max Quantity EA Count']),
      am_max_qty_gm_amt: parseInt(info['Acute Med Max Quantity GM Amt']),
      am_max_qty_ml_amt: parseInt(info['Acute Med Max Quantity ML Amt']),
      comment_txt: info['Comments'],
      update_flg: "F",
      secondary_claim_cd: info['Claim Type Code']
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Plan Params : "Pricing Parameters"
  addPlanParams: function (info, user, pcc, networkid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/By Brand and Generic Only'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      group_id: info.group_id,
      plan_id: info.plan_id,
      network_id: networkid,
      allowRefill: parseFloat(info.allowRefill) / 100 || -1,
      authReqAmt: parseFloat(info.authReqAmt) || -1,
      maxDaysSupply: parseInt(info.maxDaysSupply) || -1,
      rxBrandPriceCode: info.b_price_code,
      rxGenPriceCode: info.g_price_code,
      rxBrandDiscount: parseFloat(info.b_price_discount) / 100 || -1,
      rxGenDiscount: parseFloat(info.g_price_discount) / 100 || -1,
      rxBrandFee: parseFloat(info.b_dispense_fee) || -1,
      rxGenFee: parseFloat(info.g_dispense_fee) || -1,
      rxBrandAdminFee: parseFloat(info.b_admin_fee) || -1,
      rxGenAdminFee: parseFloat(info.g_admin_fee) || -1,
      comments: "",
      update_flg: info.update_flag
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan drug
  deletePlanDrug: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_plan_drug'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan drug
  deletePlanFormulary: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_plan_formulary'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan drug
  deletePlanFormularyRestrictions: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_plan_formulary_restrict'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan Network Provider
  deletePlanNetworkProvider: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_network_provider'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan Network Chain
  deletePlanNetworkChain: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_chain'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan Network
  deletePlanNetwork: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_group_plan_network'
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default planServices
