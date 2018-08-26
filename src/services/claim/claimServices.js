import http from 'superagent'

require('../../../data/return.json')
require('../../../data/claim/get_claim.json')
require('../../../data/claim/get_claim_list.json')
require('../../../data/claim/get_claim_count.json')
require('../../../data/claim/get_valid_hcpcs.json')
require('../../../data/claim/get_claim_ingredient_list.json')
require('../../../data/claim/get_member_benefits_by_plan.json')
require('../../../data/provider/get_provider_list_using_ncsz.json')

import { getJSONData } from '../common'

const claimServices = {
  // Returns count of entities matching the search criteria or'd together.
  getCountClaims: function (searches) {
    const dataUrl = '/static/api/get_claim_count.json'
    const apiUrl = 'Pbmsys/ClaimWebService.asmx/Count'
    return getJSONData(dataUrl, apiUrl, { searches })
  },

  // Return entities from repository that match search criteria.
  getClaims: function (data) {
    const dataUrl = '/static/api/get_claim_list.json'
    const apiUrl = 'Pbmsys/ClaimWebService.asmx/GetPageOr'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Return entities from repository that match search criteria.
  getProviderSearch: function (data) {
    const dataUrl = '/static/api/get_provider_list_using_ncsz.json'
    const apiUrl = 'Pbmsys/ProviderWebService.asmx/GetPageOr'
    return getJSONData(dataUrl, apiUrl, data)
  },

  // Get claim based of the claim_id
  getByIdClaim: function(data) {
    const dataUrl = '/static/api/get_claim.json';
    const apiUrl = 'webservices.asmx/get_claim_using_claim_id'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getValidHCPCS: function(data)  {
    const dataUrl = '/static/api/get_valid_hcpcs.json';
    const apiUrl = 'webservices.asmx/get_valid_hcpcs'
    return getJSONData(dataUrl, apiUrl, data)
  },

  updateHcpcsInfo: function(data) {
    const dataUrl = '/static/api/return.json'
    const apiUrl = 'webservices.asmx/update_hcpcs_info'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getClaimCompoundIngredientList: function(data) {
    const dataUrl = '/static/api/get_claim_ingredient_list.json'
    const apiUrl = 'webservices.asmx/get_claim_compound_ingredient_list'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getMemberBenefitsByPlan: function(data) {
    const dataUrl = '/static/api/get_member_benefits_by_plan.json'
    const apiUrl = 'webservices.asmx/get_member_benefits_by_plan'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getGroupsList: function(data) {
    const dataUrl = '/static/api/get_group_list.json'
    const apiUrl = 'Pbmsys/GroupWebService.asmx/Get'
    return getJSONData(dataUrl, apiUrl, data)
  },

  postClaimReversal: function(data) {
    const dataUrl = '/static/api/get_group_list.json'
    const apiUrl = 'webservices.asmx/post_claim_reversal'
    return getJSONData(dataUrl, apiUrl, data)
  },

  getProductionForClaim: function(data) {
    const dataUrl = '/static/api/get_group_list.json'
    const apiUrl = 'Medsys/MedProductionWebService.asmx/Get'
    return getJSONData(dataUrl, apiUrl, data)
  }
}

export default claimServices
