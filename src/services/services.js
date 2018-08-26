'use strict'
// local data
require('../../data/login.json')
require('../../data/get_pcc_list.json')
require('../../data/users/get_user_list.json')
require('../../data/users/get_user.json')
require('../../data/get_user_classes.json')
require('../../data/users/get_user_feature_codes.json')
require('../../data/users/get_user_sid_permissions.json')
require('../../data/users/get_user_group_permissions.json')
require('../../data/drugs/get_group_plan_mac.json')
require('../../data/drugs/get_group_mac.json')

require('../../data/return.json')

import {getJSONData, httpWrapper} from './common'

const services = {
  // get all of users
  getLogin: function (info) {
    if (window.localMode) {
      const dataUrl = '/static/api/login.json'
      const data = {}
      return httpWrapper.LoadLocalXMLData(dataUrl, data)
    } else {
      const dataUrl = 'pbmsys/AuthWebService.asmx/Login'
      const data = {
        uid: info.uid,
        pwd: info.pwd,
        version: 1
      }
      return httpWrapper.LoadXMLData(dataUrl, data)
    }
  },

  // get all of PCNs
  getAllPCN: function (uid) {
    const dataUrl = '/static/api/get_pcc_list.json'
    const apiUrl = 'webservices.asmx/get_pcc_list'
    const data = {
      uid: uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // get all of Classes
  getAllClassesData: function () {
    const dataUrl = '/static/api/get_user_classes.json'
    const apiUrl = 'webservices.asmx/get_user_classes'
    return getJSONData(dataUrl, apiUrl, {})
  },

  // get all of Features
  getAllFeaturesData: function () {
    const dataUrl = '/static/api/get_user_feature_codes.json'
    const apiUrl = 'webservices.asmx/get_user_feature_codes'
    return getJSONData(dataUrl, apiUrl, {})
  },

  // Users Table Data
  getUsersData: function (user, pcn) {
    const dataUrl = '/static/api/get_user_list.json'
    const apiUrl = 'Pbmsys/UserWebService.asmx/Get'
    const data = {
      search: {},
      orderBy: '',
      includeProperties: 'PccAccessList'
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get User Data for edit
  getUserData: function (uid) {
    const dataUrl = '/static/api/get_user.json'
    const apiUrl = 'webservices.asmx/get_user'
    const data = {
      uid: uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  any: function (data) {
    const dataUrl = '/static/api/get_user.json'
    const apiUrl = 'pbmsys/PlanWebService.asmx/Any'

    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Sid Data for edit
  getSidData: function (sid) {
    const dataUrl = '/static/api/get_user_sid_permissions.json'
    const apiUrl = 'webservices.asmx/get_user_sid_permissions'
    const data = {
      sid: sid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get Group Data for edit
  getUserGroupData: function (uid, pcc) {
    const dataUrl = '/static/api/get_user_group_permissions.json'
    const apiUrl = 'webservices.asmx/get_user_group_permissions'
    const data = {
      uid: uid,
      pcc: pcc === 'All PCNs' ? '*' : pcc
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add PCN
  addUserPCN: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_user_pcc'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add New User
  addUser: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_user'
    let data = info
    data.session_uid = user.session_uid
    data.session_id = user.session_id
    data.pcc = (pcc === 'All PCNs') ? '*' : pcc
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add SID of User Permission
  addUserPermissionSID: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_user_pcc_sid_permission'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add SID of User Permission
  addUserGroup: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_user_group'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // add SID of User Permission
  addUserGroupPermission: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_user_group_sid_permission'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // update User Information
  updateUserInfo: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_user'
    const data = {
      session_uid: user.session_uid,
      updated_by: user.session_uid,
      pcc: pcc.pcc,
      lname: info.lname || '',
      fname: info.fname || '',
      pwd: info.pwd || '',
      v_pwd: info.v_pwd || '',
      uid: info.uid || '',
      addr1_txt: info.addr1_txt || '',
      addr2_txt: info.addr2_txt || '',
      city_txt: info.city_txt || '',
      state_cd: info.state_cd || '',
      zip_cd: info.zip_cd || '',
      phone_num: info.phone_num || '',
      fax_num: info.fax_num || '',
      cell_num: info.cell_num || '',
      pager_num: info.pager_num || '',
      email_addr_txt: info.email_addr_txt || '',
      type_cd: info.type_cd || '',
      status_cd: info.status_cd,
      all_pcc: info.all_pcc,
      locked_out_flg: info.locked_out_flg,
      internal_flg: info.internal_flg
    }
    // if (data.pwd === undefined) data.pwd = ''
    return getJSONData(dataUrl, apiUrl, data)
  },

  // update Class of User Permission
  updateUserClassPermission: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_user_pcc_class'
    return getJSONData(dataUrl, apiUrl, data)
  },

  //  update User SID Permission
  updateUserSIDPermission: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_user_sid_permission'
    return getJSONData(dataUrl, apiUrl, data)
  },

  //  update User Group Class
  updateUserGroupClass: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_user_group_class'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete User PCN
  deleteUserPCN: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_user_pcc'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete User PCN
  deleteUserPermissionSID: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_user_permission'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Delete User Group
  deleteUserGroup: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_user_group'
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default services
