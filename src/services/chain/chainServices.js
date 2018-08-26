'use strict'
// local data
require('../../../data/return.json')

require('../../../data/chain/get_chain_list.json')
require('../../../data/chain/get_chain_data.json')
require('../../../data/chain/get_chain_providers.json')

import { getJSONData } from '../common'

const chainServices = {
  // Get All Chain List
  getChainList: function (data) {
    const dataUrl = '/static/api/get_chain_list.json'
    const apiUrl = 'webservices.asmx/get_chain_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  //Get Chain data when click one using chain_id
  getChain: function (data) {
    const dataUrl = '/static/api/get_chain_data.json'
    const apiUrl = 'webservices.asmx/get_chain_data'
    return getJSONData(dataUrl, apiUrl, data)
  },

  //Get Providers
  getProviders: function (data) {
    const dataUrl = '/static/api/get_chain_providers.json'
    const apiUrl = 'webservices.asmx/get_chain_providers'
    return getJSONData(dataUrl, apiUrl, data)
  },

  //Update chain data
  updateChain: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_chain'
    const data = {
      chain_id: info['Chain ID'],
      name: info['Chain Name'],
      reference_id: info['Reference ID'] || '',
      description: info.Description || '',
      user: user.session_uid,
      status: info.Status,
      contact: info.Contact,
      address1: info['Address 1'] || '',
      address2: info['Address 2'] || '',
      city: info.City || '',
      zip: info.Zip || '',
      state: info.State || ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  //Add chain data
  addChain: function (info, user) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/add_chain'
    const data = {
      chain_name: info['Chain Name'],
      reference_id: info['Reference ID'] || '',
      desc_txt: info.Description || '',
      created_by: user.session_uid,
      contact: info.Contact,
      address1: info['Address 1'] || '',
      address2: info['Address 2'] || '',
      city: info.City || '',
      zip: info.Zip || '',
      state: info.State || ''
    }
    return getJSONData(dataUrl, apiUrl, data)
  },

  //Delete chain data
  deleteChain: function (data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/remove_provider_from_chain'
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default chainServices
