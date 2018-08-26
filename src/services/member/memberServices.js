'use strict'
import {convertDate} from '../../components/utils/DateMethods'

// local data
require('../../../data/return.json')
require('../../../data/member/edit_form_type.json')
require('../../../data/member/get_searched_member_list.json')
require('../../../data/member/get_member_drug_list.json')
require('../../../data/member/member_plan_list.json')
require('../../../data/member/get_plan_list_for_member_edit_benefits.json')
require('../../../data/member/member.json')
require('../../../data/member/get_member_other_insurance.json')

import {getJSONData} from '../common'

const memberServices = {
  // Get Member Form Type
  getMemberType: function (data) {
    const dataUrl = '/static/api/edit_form_type.json'
    const apiUrl = 'Pbmsys/PcOrgWebService.asmx/GetPage'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Member Plan List
  getMemberPlanLists: function (data) {
    const dataUrl = '/static/api/member_plan_list.json'
    const apiUrl = 'Pbmsys/PlanWebService.asmx/Get'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Member List Count By find
  getMemberListCount: function (data) {
    const dataUrl = '/static/api/get_searched_member_list.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/Count'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Member List By find
  getMemberList: function (data) {
    const dataUrl = '/static/api/get_searched_member_list.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/GetPage'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Member List By find
  getMember: function (data) {
    const dataUrl = '/static/api/member.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/GetByKey'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Member List By find
  getHOHMember: function (data) {
    const dataUrl = '/static/api/member.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/Get'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getMemberOtherInsurance: function (search) {
    const dataUrl = '/static/api/get_member_other_insurance.json'
    const apiUrl = 'Pbmsys/MemberOtherInsuranceWebService.asmx/Get'
    const data = {
      search: search,
      orderBy: '',
      includeProperties: ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Member Drug List
  getMemberDrugList: function (data) {
    const dataUrl = '/static/api/get_member_drug_list.json'
    const apiUrl = 'webservices.asmx/get_member_drug_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Plan List for member edit benefits
  getPlanListForMemberEditBenefits: function (data) {
    const dataUrl = '/static/api/get_plan_list_for_member_edit_benefits.json'
    const apiUrl = 'webservices.asmx/get_plan_list_for_member_edit_benefits'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Plan Member
  addPlanMember: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberWebService.asmx/new'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Plan Member
  addNewPlanMember: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberWebService.asmx/Add'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Plan Member
  updatePlanMember: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberWebService.asmx/Update'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Plan Member
  deletePlanMember: function (info) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberWebService.asmx/delete'
    let data = {
      entity: info
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Member
  updateMember: function (info, user) {
    const dataUrl = '/static/api/member.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/update'
    let data = {
      entity: info
    }
    data.entity.UpdatedBy = user.session_uid
    data.entity.DateOfBirth = convertDate(data.entity.DateOfBirth)
    data.entity.CardholderDateOfBirth = convertDate(data.entity.CardholderDateOfBirth)
    data.entity.CreatedDate = convertDate(data.entity.CreatedDate)
    if (data.entity.Allergy) {
      data.entity.Allergy.CreatedDate = convertDate(data.entity.Allergy.CreatedDate)
      data.entity.Allergy.UpdatedDate = convertDate(data.entity.Allergy.UpdatedDate)
    }
    if (data.entity.Diagnosis) {
      data.entity.Diagnosis.CreatedDate = convertDate(data.entity.Diagnosis.CreatedDate)
      data.entity.Diagnosis.UpdatedDate = convertDate(data.entity.Diagnosis.UpdatedDate)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  newMember: function (data) {
    const dataUrl = '/static/api/member.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/New'
    return getJSONData(dataUrl, apiUrl, data)
  },

  addMember: function (info, user) {
    const dataUrl = '/static/api/member.json'
    const apiUrl = 'Pbmsys/MemberWebService.asmx/Add'
    let data = {
      entity: info
    }

    data.entity.CreatedBy = user.session_uid
    data.entity.CardholderDateOfBirth = convertDate(data.entity.CardholderDateOfBirth)
    data.entity.CreatedDate = convertDate(data.entity.CreatedDate)
    data.entity.UpdatedDate = convertDate(data.entity.UpdatedDate)
    data.entity.DateOfBirth = convertDate(data.entity.DateOfBirth)

    if (data.entity.Allergy) {
      data.entity.Allergy.CreatedDate = convertDate(data.entity.Allergy.CreatedDate)
      data.entity.Allergy.UpdatedDate = convertDate(data.entity.Allergy.UpdatedDate)
    }
    if (data.entity.Diagnosis) {
      data.entity.Diagnosis.CreatedDate = convertDate(data.entity.Diagnosis.CreatedDate)
      data.entity.Diagnosis.UpdatedDate = convertDate(data.entity.Diagnosis.UpdatedDate)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Member Drug
  updateMemberDrug: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_member_drug'
    let data = {
      mdid: info.mdid,
      drug_desc_txt: info['Drug Name'],
      drug_type_cd: info.drug_type_code,
      tier: info['*Tier'],
      include_exclude_ind: info['*Inc/Ex'],
      min_qty: info['*Min Qty'] || 0,
      max_qty: info['*Max Qty'] || 0,
      min_days: info['*Min Days'] || 0,
      max_days: info['*Max Days'] || 0,
      qty_term_cd: info.qty_term_cd,
      ds_qty_limit: info['*Supply Limit'] || 0,
      effect_start_dt: info['*Start Dt'],
      effect_end_dt: info['*End Dt'],
      msg_txt: info['*Response Message'] || '',
      sig: info['*Sig'] || '',
      uid: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Member Drug
  addMemberDrug: function (info, user, member) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_member_drug'
    let data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: member.Pcc,
      member_id: member.MemberId,
      person_cd: member.PersonCode,
      drug_id_type_cd: info['Drug ID Type Code'],
      drug_id: info['Drug Id'],
      tier: info['*Tier'],
      min_qty: info['*Min Qty'] || 0,
      max_qty: info['*Max Qty'] || 0,
      min_days: info['*Min Days'] || 0,
      max_days: info['*Max Days'] || 0,
      qty_term_cd: info.qty_term_cd,
      ds_qty_limit: info['*Supply Limit'] || 0,
      effect_start_dt: info['*Start Dt'],
      effect_end_dt: info['*End Dt'],
      drug_desc_txt: info['Drug Name'],
      include_exclude_ind: info['*Inc/Ex'],
      msg_txt: info['*Response Message'] || '',
      sig: info['*Sig'] || '',
      drug_type_cd: info.drug_type_code
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Member Drug
  deleteMemberDrug: function (mdid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_member_drug'
    const data = {
      mdid: mdid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Member Other Insurance
  updateMemberOtherInsurance: function (info, user) {
    const dataUrl = '/static/api/get_member_other_insurance.json'
    const apiUrl = 'Pbmsys/MemberOtherInsuranceWebService.asmx/update'
    let data = {
      entity: info
    }
    data.entity.EffectiveStartDate = convertDate(data.entity.EffectiveStartDate)
    data.entity.EffectiveEndDate = convertDate(data.entity.EffectiveEndDate)
    data.entity.CreatedDate = convertDate(data.entity.CreatedDate)
    data.entity.UpdatedDate = convertDate(data.entity.UpdatedDate)
    data.entity.UpdatedBy = user.session_uid
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Member Other Insurance
  addMemberOtherInsurance: function (info, user) {
    const dataUrl = '/static/api/get_member_other_insurance.json'
    const apiUrl = 'Pbmsys/MemberOtherInsuranceWebService.asmx/add'
    let data = {
      entity: info
    }
    data.entity.EffectiveStartDate = convertDate(data.entity.EffectiveStartDate)
    data.entity.EffectiveEndDate = convertDate(data.entity.EffectiveEndDate)
    data.entity.CreatedBy = user.session_uid
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete Member Other Insurance
  deleteMemberOtherInsurance: function (info) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/MemberOtherInsuranceWebService.asmx/delete'
    let data = {
      entity: info
    }
    data.entity.EffectiveStartDate = convertDate(data.entity.EffectiveStartDate)
    data.entity.EffectiveEndDate = convertDate(data.entity.EffectiveEndDate)
    data.entity.CreatedDate = convertDate(data.entity.CreatedDate)
    data.entity.UpdatedDate = convertDate(data.entity.UpdatedDate)
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Member Benefits
  getPlanMemberBenefit: function (data) {
    const dataUrl = '/static/api/get_member_other_insurance.json'
    const apiUrl = 'pbmsys/PlanMemberBenefitWebService.asmx/Get'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Add Member Benefits
  addPlanMemberBenefit: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberBenefitWebService.asmx/Add'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Update Member Benefits
  updatePlanMemberBenefit: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'Pbmsys/PlanMemberBenefitWebService.asmx/Update'
    return getJSONData(dataUrl, apiUrl, data)
  },
}

export default memberServices
