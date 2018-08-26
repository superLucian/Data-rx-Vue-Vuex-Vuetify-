import { getJSONData } from '../common'

require('../../../data/return.json')
require('../../../data/specPrograms/get_spec_program_list.json')
require('../../../data/specPrograms/get_spec_program_data.json')
require('../../../data/specPrograms/get_spec_program_drug_list.json')
require('../../../data/specPrograms/get_spec_program_drug.json')

const specialProgramsServices = {
  /*
   string pcn
   */
  getSpecProgramList(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_spec_program_list.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_spec_program_list'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  /*
   string program_id
   */
  getSpecProgramData(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_spec_program_data.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_spec_program_data'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  /*
   string program_id
   */
  getSpecProgramDrugList(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/get_spec_program_drug_list.json'
    const API_DATA_ADDRESS = 'webservices.asmx/get_spec_program_drug_list'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

    /*
     string program_id
     drug_id
     qty
     */
    getSpecProgramDrug(requestData) {
      const STATIC_DATA_ADDRESS = '/static/api/get_spec_program_drug.json'
      const API_DATA_ADDRESS = 'webservices.asmx/get_spec_program_drug'
      return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
    },

  //  Update Spec Program
  // program_id int
  // desc_txt int
  // status_cd string
  // basis int
  // program_fee double
  updateSpecProgram: function(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/update_spec_program'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  //  Update Spec Program Provider
  // program_id int
  // pid int
  // status_cd string
  // provider_markup double
  // tier1_markup double
  // tier2_markup double
  // tier3_markup double
  // tier4_markup double
  // provider_fee double
  // uid string
  updateSpecProgramProvider: function(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/update_spec_program_provider'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },


  //  Update Spec Program Drug

  // program_id,
  // drug_id_type_cd,
  // drug_id,
  // curr_quantity,
  // qty,
  // days_supply,
  // pack_size,
  // tier,
  // price_amt,
  // drug_type_cd,
  // status_cd,
  // uid

  updateSpecProgramDrug: function(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/update_spec_program_drug'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },

  //  Add Spec Program Drug
  // program_id,
  // drug_id_type_cd,
  // drug_id,
  // curr_quantity,
  // qty,
  // days_supply,
  // pack_size,
  // tier,
  // price_amt,
  // drug_type_cd,
  // status_cd,
  // uid

  addSpecProgramDrug: function(requestData) {
    const STATIC_DATA_ADDRESS = '/static/api/return.json'
    const API_DATA_ADDRESS = 'webservices.asmx/add_spec_program_drug'
    return getJSONData(STATIC_DATA_ADDRESS, API_DATA_ADDRESS, requestData)
  },
}
export default specialProgramsServices
