'use strict'
import http from 'superagent'

// local data
require('../../../data/return.json')
require('../../../data/provider/get_provider_list_using_ncsz.json')
require('../../../data/provider/get_provider_list_using_id.json')
require('../../../data/provider/get_provider_list_using_store_id.json')
require('../../../data/provider/get_provider.json')
require('../../../data/provider/get_group_list.json')
require('../../../data/provider/get_provider_mpp_list.json')
require('../../../data/provider/get_mpp_data.json')
require('../../../data/provider/get_provider_mpp_data.json')
require('../../../data/provider/get_chain_list.json')
require('../../../data/priceIt/get_mpp_drug_list.json')
require('../../../data/priceIt/get_mpp_drug_list_by_drug_id.json')

import { getJSONData } from '../common'

const priceItServices = {

  getMppDrugList: function (data) {
  const dataUrl = '/static/api/get_mpp_drug_list.json'
  const apiUrl = 'webservices.asmx/get_mpp_drug_list'
  return getJSONData(dataUrl, apiUrl, data)
},

  getMppDrugDetail: function (data) {
    const dataUrl = '/static/api/get_mpp_drug_list_by_drug_id.json'
    const apiUrl = 'webservices.asmx/get_mpp_drug_list_by_drug_id'
    return getJSONData(dataUrl, apiUrl, data)
  },

  addProvider: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_provider'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      provider_id: info.nabp,
      npi: info.npi,
      type_cd: '00',
      status_cd: 'A',
      store_id: info.store_id,
      name_txt: info.name_txt,
      loc_addr1_txt: info.loc_addr1_txt,
      loc_addr2_txt: info.loc_addr2_txt,
      loc_city_txt: info.loc_city_txt,
      loc_state_cd: info.loc_state_cd,
      loc_zip_cd: info.loc_zip_cd,
      mail_addr1_txt: info.mail_addr1_txt,
      mail_addr2_txt: info.mail_addr2_txt,
      mail_city_txt: info.mail_city_txt,
      mail_state_cd: info.mail_state_cd,
      mail_zip_cd: info.mail_zip_cd,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      web_url_txt: info.web_url_txt,
      fed_license_txt: info.fed_license_txt,
      fed_tax_id: info.fed_tax_id,
      state_license_txt: info.state_license_txt,
      state_tax_id: info.state_tax_id,
      open_24_hours_ind: info.open_24_hours_ind,
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
      medicad_id: info.medicad_id
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addProviderChain: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_provider_to_chain'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateProvider: function (info, user, pcc) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_provider'
    const data = {
      session_uid: user.session_uid,
      session_id: user.session_id,
      pcc: pcc,
      network_id: '',
      contract_id: '',
      pid: info.pid,
      provider_id: info.nabp,
      npi: info.npi,
      type_cd: '00',
      status_cd: info.status_cd,
      store_id: info.store_id,
      name_txt: info.name_txt,
      loc_addr1_txt: info.loc_addr1_txt,
      loc_addr2_txt: info.loc_addr2_txt,
      loc_city_txt: info.loc_city_txt,
      loc_state_cd: info.loc_state_cd,
      loc_zip_cd: info.loc_zip_cd,
      mail_addr1_txt: info.mail_addr1_txt,
      mail_addr2_txt: info.mail_addr2_txt,
      mail_city_txt: info.mail_city_txt,
      mail_state_cd: info.mail_state_cd,
      mail_zip_cd: info.mail_zip_cd,
      phone_num: info.phone_num,
      fax_num: info.fax_num,
      email_addr_txt: info.email_addr_txt,
      web_url_txt: info.web_url_txt,
      fed_license_txt: info.fed_license_txt,
      fed_tax_id: info.fed_tax_id,
      state_license_txt: info.state_license_txt,
      state_tax_id: info.state_tax_id,
      open_24_hours_ind: info.open_24_hours_ind,
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
      medicad_id: info.medicad_id
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  addNetworkProvider: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_network_provider'
    return getJSONData(dataUrl, apiUrl, data)
  },

  AddMppList: function (info) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_provider_mpp'
    const data = {
      group_id: info.group_id,
      pid: info.pid,
      zip_cd: info['Pricing Zip'],
      price_cd: info['Price Code'],
      brand_price_cd: info.brand_price_cd,
      generic_price_cd: info.generic_price_cd,
      narcotic_price_cd: info.narcotic_price_cd,
      fee: info.fee,
      percent_fee: info.percent_fee / 100,
      min_claim_amt: info.min_claim_amt,
      brand_markup: info.brand_markup,
      generic_markup: info.generic_markup,
      narcotic_markup: info.narcotic_markup,
      brand_markup_pct: info.brand_markup_pct / 100,
      generic_markup_pct: info.generic_markup_pct / 100,
      narcotic_markup_pct: info.generic_markup_pct / 100,
      created_by: info.created_by
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  UpdateMppDrugList: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_mpp_drug_list'
    const data = {
      mpp_id: info.mpp_id,
      drug_id: info.drug_id,
      price_cd: info.price_cd,
      quantity1: info.quantity1 || 0,
      quantity2: info.quantity2 || 0,
      quantity3: info.quantity3 || 0,
      price_amt1: info.price_amt1 || 0,
      price_amt2: info.price_amt2 || 0,
      price_amt3: info.price_amt3 || 0,
      start_dt: info.start_dt || (new Date()).toLocaleDateString(),
      end_dt: info.end_dt || (new Date()).toLocaleDateString(),
      created_by: user.session_uid
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  getProvider: function (data) {
    const dataUrl = '/static/api/get_provider.json'
    const apiUrl = 'webservices.asmx/get_provider'
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

  getMppData: function (data) {
    const dataUrl = '/static/api/get_mpp_data.json'
    const apiUrl = 'webservices.asmx/get_mpp_data'
    return getJSONData(dataUrl, apiUrl, data)
  },



  deletePriceRow: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/delete_provider_mpp'
    return getJSONData(dataUrl, apiUrl, data)
  },
}

export default priceItServices
