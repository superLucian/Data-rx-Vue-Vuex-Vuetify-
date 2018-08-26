'use strict'

require('../../../data/return.json')
require('../../../data/groups/get_group_list.json')
require('../../../data/groups/get_group.json')
require('../../../data/groups/get_group_field_edits.json')
require('../../../data/groups/get_all_field_edits.json')
require('../../../data/groups/get_spec_program_list.json')

import { getJSONData } from '../common'
const groupServices = {
// Get Group list
  getGroupsData: function (user, pcn, groups) {
    const dataUrl = '/static/api/get_group_list.json'
    const apiUrl = 'webservices.asmx/get_group_list'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcn.pcc,
      groups: groups
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

// Get single Group data for edit
  getGroupData: function (user, groupid) {
    const dataUrl = '/static/api/get_group.json'
    const apiUrl = 'webservices.asmx/get_group'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      group_id: groupid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },
// Get Group's fields for editing
  getGroupFieldEdits: function (groupid) {
    const dataUrl = '/static/api/get_group_field_edits.json'
    const apiUrl = 'webservices.asmx/get_group_field_edits'
    const data = {
      group_id: groupid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getAllFieldEdits: function () {
    const dataUrl = '/static/api/get_all_field_edits.json'
    const apiUrl = 'webservices.asmx/get_all_field_edits'
    const data = {}
    return getJSONData(dataUrl, apiUrl, data)
  },
  addGroupFieldEdit: function (info, groupID, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_group_field_edit'
      const data = {
        group_id: groupID,
        field: info['field_tag'],
        edit: info['Edit'],
        status_cd: info['Status'],
        message_txt: info['Message'],
        created_by: user.session_uid
      }
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateGroupFieldEdit: function (info, groupID, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_group_field_edit'
    const data = {
      group_id: groupID,
      field: info['field_tag'],
      edit: info['Edit'],
      status_cd: info['Status'],
      message_txt: info['Message'],
      updated_by: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getSpecProgramList: function (pcn) {
    const dataUrl = '/static/api/get_spec_program_list.json'
    const apiUrl = 'webservices.asmx/get_spec_program_list'
    const data = {
      pcn: pcn.pcc
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add new Group
  addGroup: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_group'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_uid,
      pcc: pcc,
      group_cd: info.group_cd.toUpperCase(),
      org_cd: info.org_cd.toUpperCase(),
      type_cd: parseInt(info.type_cd),
      parent_group_id: parseInt(info.parent_group_id),
      status_cd: info.status_cd,
      name_txt: info.name_txt.toUpperCase(),
      mail_addr1_txt: info.mail_addr1_txt,
      mail_addr2_txt: info.mail_addr2_txt,
      mail_city_txt: info.mail_city_txt,
      mail_state_cd: info.mail_state_cd,
      mail_zip_cd: info.mail_zip_cd,
      invoice_addr1_txt: info.invoice_addr1_txt,
      invoice_addr2_txt: info.invoice_addr2_txt,
      invoice_city_txt: info.invoice_city_txt,
      invoice_state_cd: info.invoice_state_cd,
      invoice_zip_cd: info.invoice_zip_cd,
      cust_svc_phone_num: info.cust_svc_phone_num,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      web_url_txt: info.web_url_txt,
      admin_fee_amt: parseFloat(info.admin_fee_amt) || 0,
      reversal_time_limit: parseInt(info.reversal_time_limit) || 30,
      gl_acct_num: info.gl_acct_num,
      calendar_period_start_dt: info.calendar_period_start_dt,
      calendar_period_end_dt: info.calendar_period_end_dt,
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
      next_inv_num: parseInt(info.next_inv_num),
      comment_txt: info.comment_txt,
      required_fields: info.required_fields,
      field_edits: info.field_edits,
      response_msg_txt: info.response_msg_txt,
      reject_msg_txt: info.reject_msg_txt,
      validate_dx_cd_flg: info.validate_dx_cd_flg,
      spec_program_id: info.spec_program_id,
      min_charge_amt: parseFloat(info.min_charge_amt) || 0,
      future_fill_time_limit: info.future_fill_time_limit || -1
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // update Group Information
  updateGroupInfo: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_group'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_uid,
      pcc: pcc,
      group_id: info.group_id,
      group_cd: info.group_cd.toUpperCase(),
      org_cd: info.org_cd.toUpperCase(),
      type_cd: info.type_cd,
      parent_group_id: info.parent_group_id,
      status_cd: info.status_cd,
      name_txt: info.name_txt.toUpperCase(),
      mail_addr1_txt: info.mail_addr1_txt,
      mail_addr2_txt: info.mail_addr2_txt,
      mail_city_txt: info.mail_city_txt,
      mail_state_cd: info.mail_state_cd,
      mail_zip_cd: info.mail_zip_cd,
      invoice_addr1_txt: info.invoice_addr1_txt,
      invoice_addr2_txt: info.invoice_addr2_txt,
      invoice_city_txt: info.invoice_city_txt,
      invoice_state_cd: info.invoice_state_cd,
      invoice_zip_cd: info.invoice_zip_cd,
      cust_svc_phone_num: info.cust_svc_phone_num,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      web_url_txt: info.web_url_txt,
      admin_fee_amt: info.admin_fee_amt || 0,
      reversal_time_limit: info.reversal_time_limit || 30,
      gl_acct_num: info.gl_acct_num,
      calendar_period_start_dt: info.calendar_period_start_dt,
      calendar_period_end_dt: info.calendar_period_end_dt,
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
      comment_txt: info.comment_txt,
      required_fields: info.required_fields,
      field_edits: info.field_edits,
      response_msg_txt: info.response_msg_txt,
      reject_msg_txt: info.reject_msg_txt,
      validate_dx_cd_flg: info.validate_dx_cd_flg,
      spec_program_id: info.spec_program_id,
      min_charge_amt: parseFloat(info.min_charge_amt) || 0,
      future_fill_time_limit: info.future_fill_time_limit || -1
    }
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default groupServices
