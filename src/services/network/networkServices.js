'use strict'
// local data
require('../../../data/return.json')
require('../../../data/network/get_network_list.json')
require('../../../data/network/get_contract_list.json')
require('../../../data/network/get_network.json')
require('../../../data/network/get_network_provider_list.json')
require('../../../data/network/get_network_provider_data.json')
require('../../../data/network/get_provider_mpp_list.json')
require('../../../data/network/get_provider_mpp_data.json')
require('../../../data/network/get_mpp_data.json')
require('../../../data/network/get_group_list.json')
require('../../../data/network/get_chain_list_using_networkid.json')
require('../../../data/network/get_chain_list.json')
require('../../../data/network/get_network_chain.json')
require('../../../data/network/get_network_prescriber_list.json')
require('../../../data/network/get_prescriber_list_by_prescriber_name.json')
require('../../../data/network/get_prescriber_list_by_prescriber_id.json')
require('../../../data/network/get_prescriber.json')

import { getJSONData } from '../common'

const pcnServices = {
  // Get All Network List Items Data
  getNetworkList: function (pcc) {
    const dataUrl = '/static/api/get_network_list.json'
    const apiUrl = 'webservices.asmx/get_network_list'
    const data = {
      pcc: pcc
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Contract List Items Data
  getContractList: function () {
    const dataUrl = '/static/api/get_contract_list.json'
    const apiUrl = 'webservices.asmx/get_contract_list'
    const data = {}
    return getJSONData(dataUrl, apiUrl, data)
  },

  getNetwork: function (netid) {
    const dataUrl = '/static/api/get_network.json'
    const apiUrl = 'webservices.asmx/get_network'
    const data = {
      network_id: parseInt(netid)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  /* Add new Network */
  addNetwork: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_network'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      type_cd: info.type_cd,
      status_cd: info.status_cd,
      desc_txt: info.desc_txt.toUpperCase(),
      comment_txt: info.comment_txt.toUpperCase(),
      contract_id: parseInt(info.contract_id)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  /* Update Network */
  updateNetwork: function (info, user, pcc, networkID) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_network'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      network_id: parseInt(networkID),
      type_cd: info.type_cd,
      status_cd: info.status_cd,
      desc_txt: info.desc_txt.toUpperCase(),
      comment_txt: info.comment_txt.toUpperCase(),
      contract_id: parseInt(info.contract_id)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get All Network Provider List Items Data
  getNetworkProviderList: function (networkID, pageNum) {
    const dataUrl = '/static/api/get_network_provider_list.json'
    const data = {
      network_id: parseInt(networkID),
      page_num: parseInt(pageNum)
    }
    const apiUrl = 'webservices.asmx/get_network_provider_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  deleteNetworkProvider: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_network_provider'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      network_id: parseInt(info.network_id),
      pid: info.pid.toString()
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addNetworkProvider: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_network_provider'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      network_id: parseInt(info.network_id),
      pid: info.pid.toString()
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getNetworkProviderData: function (networkID, pid) {
    const dataUrl = '/static/api/get_network_provider_data.json'
    const data = {
      network_id: parseInt(networkID),
      pid: pid.toString()
    }
    const apiUrl = 'webservices.asmx/get_network_provider_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateProvider: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_provider'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      network_id: info.network_id || '0',
      contract_id: info.contract_id.toString() || '',
      pid: info.pid.toString() || '0',
      provider_id: info.nabp,
      npi: info.npi,
      type_cd: info.type_cd,
      status_cd: info.status_cd,
      store_id: info.store_id || '',
      name_txt: info.name_txt,
      loc_addr1_txt: info.loc_addr1_txt || '',
      loc_addr2_txt: info.loc_addr2_txt || '',
      loc_city_txt: info.loc_city_txt || '',
      loc_state_cd: info.loc_state_cd || '',
      loc_zip_cd: info.loc_zip_cd || '',
      mail_addr1_txt: info.mail_addr1_txt || '',
      mail_addr2_txt: info.mail_addr2_txt || '',
      mail_city_txt: info.mail_city_txt || '',
      mail_state_cd: info.mail_state_cd || '',
      mail_zip_cd: info.mail_zip_cd || '',
      phone_num: info.phone_num || '',
      fax_num: info.fax_num || '',
      email_addr_txt: info.email_addr_txt || '',
      web_url_txt: info.web_url_txt || '',
      fed_license_txt: info.fed_license_txt || '',
      fed_tax_id: info.fed_tax_id || '',
      state_license_txt: info.state_license_txt || '',
      state_tax_id: info.state_tax_id || '',
      open_24_hours_ind: info.open_24_hours_ind,
      contact_lname: info.contact_lname,
      contact_fname: info.contact_fname,
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
      comment_txt: info.comment_txt || '',
      medicad_id: info.medicad_id || ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getProviderMppList: function (pcc, pid) {
    const dataUrl = '/static/api/get_provider_mpp_list.json'
    const data = {
      pcc: pcc,
      pid: pid.toString()
    }
    const apiUrl = 'webservices.asmx/get_provider_mpp_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  deleteProviderMpp: function (groupId, pid) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_provider_mpp'
    const data = {
      group_id: groupId,
      pid: pid.toString()
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getProviderMppData: function (groupid, pid) {
    const dataUrl = '/static/api/get_provider_mpp_data.json'
    const data = {
      group_id: parseInt(groupid),
      pid: pid.toString()
    }
    const apiUrl = 'webservices.asmx/get_provider_mpp_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateProviderMpp: function (info, user, groupId) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_provider_mpp'
    const data = {
      group_id: parseInt(groupId),
      pid: info.pid.toString(),
      zip_cd: info.zip_cd.toString(),
      price_cd: info.price_cd,
      fee: parseFloat(info.fee),
      percent_fee: parseFloat(info.percent_fee) / 100,
      min_claim_amt: parseFloat(info.min_claim_amt),
      brand_price_cd: info.brand_price_cd,
      brand_markup: parseFloat(info.brand_markup),
      generic_price_cd: info.generic_price_cd,
      generic_markup: parseFloat(info.generic_markup),
      narcotic_price_cd: info.narcotic_price_cd,
      narcotic_markup: parseFloat(info.narcotic_markup),
      brand_markup_pct: parseFloat(info.brand_markup_pct) / 100,
      generic_markup_pct: parseFloat(info.generic_markup_pct) / 100,
      narcotic_markup_pct: parseFloat(info.narcotic_markup_pct) / 100,
      updated_by: user.session_uid,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addProviderMpp: function (info, user, groupId) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_provider_mpp'
    const data = {
      group_id: parseInt(groupId),
      pid: info.pid.toString(),
      zip_cd: info.zip_cd.toString(),
      price_cd: info.price_cd,
      fee: parseFloat(info.fee),
      percent_fee: parseFloat(info.percent_fee) / 100,
      min_claim_amt: parseFloat(info.min_claim_amt),
      brand_price_cd: info.brand_price_cd,
      brand_markup: parseFloat(info.brand_markup),
      generic_price_cd: info.generic_price_cd,
      generic_markup: parseFloat(info.generic_markup),
      narcotic_price_cd: info.narcotic_price_cd,
      narcotic_markup: parseFloat(info.narcotic_markup),
      brand_markup_pct: parseFloat(info.brand_markup_pct) / 100,
      generic_markup_pct: parseFloat(info.generic_markup_pct) / 100,
      narcotic_markup_pct: parseFloat(info.narcotic_markup_pct) / 100,
      created_by: user.session_uid,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getMppData: function () {
    const dataUrl = '/static/api/get_mpp_data.json'
    const data = {}
    const apiUrl = 'webservices.asmx/get_mpp_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getGroupList: function (user, pcc) {
    const dataUrl = '/static/api/get_group_list.json'
    const apiUrl = 'webservices.asmx/get_group_list'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      groups: "*"
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getChainListUsingNetworkid: function (networkId) {
    const dataUrl = '/static/api/get_chain_list_using_networkid.json'
    const data = {
      network_id: parseInt(networkId),
    }
    const apiUrl = 'webservices.asmx/get_chain_list_using_networkid'
    return getJSONData(dataUrl, apiUrl, data)
  },

  deleteChain: function (networkId, chainId) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_chain'
    const data = {
      network_id: parseInt(networkId),
      chain_id: parseInt(chainId)
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getChainList: function (networkId) {
    const dataUrl = '/static/api/get_chain_list.json'
    const data = {}
    const apiUrl = 'webservices.asmx/get_chain_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getNetworkChain: function (networkId, chainId) {
    const dataUrl = '/static/api/get_network_chain.json'
    const data = {
      network_id: parseInt(networkId),
      chain_id: parseInt(chainId)
    }
    const apiUrl = 'webservices.asmx/get_network_chain'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateNetworkChain: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_network_chain'
    const data = {
      network_id: parseInt(info['network_id']),
      chain_id: parseInt(info['chain_id']),
      contract_id: parseInt(info['contract_id']),
      uid: user.session_uid,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addNetworkChain: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_network_chain'
    const data = {
      network_id: parseInt(info['network_id']),
      chain_id: parseInt(info['chain_id']),
      contract_id: parseInt(info['contract_id']),
      uid: user.session_uid,
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getNetworkPrescriberList: function (networkId) {
    const dataUrl = '/static/api/get_network_prescriber_list.json'
    const data = {
      network_id: parseInt(networkId)
    }
    const apiUrl = 'webservices.asmx/get_network_prescriber_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getPrescriberListByPrescriberName: function (info, user, pcc) {
    const dataUrl = '/static/api/get_prescriber_list_by_prescriber_name.json'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      lname: info.lname,
      fname: info.fname
    }
    const apiUrl = 'webservices.asmx/get_prescriber_list_by_prescriber_name'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getPrescriberListByPrescriberId: function (info, user, pcc) {
    const dataUrl = '/static/api/get_prescriber_list_by_prescriber_id.json'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      npi: info.npi
    }
    const apiUrl = 'webservices.asmx/get_prescriber_list_by_prescriber_id'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getPrescriber: function (did) {
    const dataUrl = '/static/api/get_prescriber.json'
    const data = {
      did: parseInt(did)
    }
    const apiUrl = 'webservices.asmx/get_prescriber'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updatePrescriber: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_prescriber'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      did: parseInt(info.did),
      fname: info.fname.toUpperCase(),
      mname: (info.mname || '').toUpperCase(),
      lname: info.lname.toUpperCase(),
      title_txt: (info.title_txt || '').toUpperCase(),
      upin: (info.upin || '').toUpperCase(),
      spin: (info.spin || '').toUpperCase(),
      fed_license_num: (info.fed_license_num || '').toUpperCase(),
      state_license_num: (info.state_license_num || '').toUpperCase(),
      addr1_txt: (info.addr1_txt || '').toUpperCase(),
      addr2_txt: (info.addr2_txt || '').toUpperCase(),
      city_txt: (info.city_txt || '').toUpperCase(),
      state_cd: (info.state_cd || '').toUpperCase(),
      zip_cd: (info.zip_cd || '').toUpperCase(),
      phone_num: (info.phone_num || '').toUpperCase(),
      fax_num: (info.fax_num || '').toUpperCase(),
      email_addr_txt: (info.email_addr_txt || '').toUpperCase(),
      comment_txt: (info.comment_txt || '').toUpperCase()
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateNetworkPrescriber: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_network_prescriber'
    const data = {
      uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      did: parseInt(info.did),
      network_id: parseInt(info.network_id),
      start_dt: info.start_dt,
      end_dt: info.end_dt
    }
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default pcnServices
