export const UPDATE_AUTH = (state, auth) => {
  state.auth.isLoggedIn = auth
}

export const UPDATE_USER = (state, user) => {
  state.user = Object.assign({}, {...state.user}, user)
}

export const UPDATE_PCN = (state, pcn) => {
  state.pcn = pcn
}

export const UPDATE_MPP_FLAG = (state, isMPP) => {
  state.isMPP = isMPP
}

export const UPDATE_ALL_PCN = (state, allPCN) => {
  state.allPCN = allPCN
}

export const UPDATE_ALL_CLASSES = (state, allClasses) => {
  state.allClasses = allClasses
}

export const UPDATE_ALL_FEATURES = (state, allFeatures) => {
  state.allFeatures = allFeatures
}

export const UPDATE_ALL_ACESSES = (state, allAccesses) => {
  state.allAccesses = allAccesses
}

export const UPDATE_SELECTED_PERMISSION = (state, selectedPermission) => {
  state.selectedPermission = selectedPermission
}

export const UPDATE_SELECTED_PLAN = (state, selectedPlan) => {
  state.selectedPlan = selectedPlan
}

export const UPDATE_SELECTED_PLAN_DATA = (state, selectedPlanData) => {
  state.selectedPlanData = selectedPlanData
}

export const UPDATE_SELECTED_PROVIDER = (state, selectedProvider) => {
  state.selectedProvider = selectedProvider
}

export const UPDATE_SELECTED_MPP_DRUG = (state, selectedMppDrug) => {
  state.selectedMppDrug = selectedMppDrug
}

export const UPDATE_SELECTED_PRESCRIBER = (state, selectedPrescriber) => {
  state.selectedPrescriber = selectedPrescriber
}

export const UPDATE_SELECTED_CHAIN= (state, selectedChain) => {
  state.selectedChain = selectedChain
}

export const UPDATE_PLAN_SETUP_DATA = (state, planSetupData) => {
  state.planSetupData = Object.assign({}, {...state.planSetupData}, planSetupData)
}

export const UPDATE_PLAN_PARAM_SETUP_DATA = (state, planParamSetupData) => {
  state.planParamSetupData = planParamSetupData
}

export const UPDATE_PROVDER_SETUP_DATA = (state, provderSetupData) => {
  state.providerSetupData = Object.assign({}, {...state.providerSetupData}, {...provderSetupData})
}

export const UPDATE_NETWORK_SETUP_DATA = (state, networkParamSetupData) => {
  state.networkParamSetupData = Object.assign({}, {...state.networkParamSetupData}, {...networkParamSetupData})
}

export const UPDATE_MEMBER_FORM_TYPE = (state, memberFormType) => {
  state.memberFormType = memberFormType
}

export const UPDATE_SELECTED_MEMBER = (state, selectedMember) => {
  state.selectedMember = selectedMember
}

export const UPDATE_SELECTED_PLAN_MEMBER = (state, selectedPlanMembers) => {
  state.selectedPlanMembers = selectedPlanMembers
}

export const UPDATE_SELECTED_GROUP_FILTER = (state, selectedGroupFilter) => {
  state.selectedGroupFilter = selectedGroupFilter
}

export const UPDATE_MEMBER_PLAN_LISTS = (state, memberPlanLists) => {
  state.memberPlanLists = memberPlanLists
}

export const UPDATE_DRUG_SETUP_DATA = (state, drugSetupData) => {
  state.drugSetupData = Object.assign({}, {...state.drugSetupData}, drugSetupData)
}

export const UPDATE_GROUP_INFORMATION = (state, groupInformation) => {
  state.groupInformation = groupInformation
}

export const UPDATE_ALL_GROUPS = (state, allGroups) => {
  state.allGroups = allGroups
}

export const UPDATE_ALL_SPECIAL_PROGRAMS = (state, allSpecialPrograms) => {
  state.allSpecialPrograms = allSpecialPrograms
}

export const UPDATE_CLAIM_INFO = (state, claimInfo) => {
  state.claimInfo = claimInfo
}

export const UPDATE_CLAIM_SETUP_DATA = (state, claimData) => {
  state.claimSetupData = Object.assign({}, {...state.claimSetupData}, claimData)
}

export const UPDATE_GROUP_EDIT_INFO = (state, groupEditInfo) => {
  state.groupEditInfo = groupEditInfo
}

export const UPDATE_STATUS = (state, isUpdateStatus) => {
  state.isUpdateStatus = isUpdateStatus
}

export const CLEAR = (state, field) => {
  state[field] = null
}

/**
 * Clear each property, one by one, so reactivity still works.
 *
 * (ie. clear out state.auth.isLoggedIn so Navbar component automatically reacts to logged out state,
 * and the Navbar menu adjusts accordingly)
 *
 * TODO: use a common import of default state to reset these values with.
 */
export const CLEAR_ALL_DATA = (state) => {
  // clear all
  state.auth = {isLoggedIn: false}
  state.user = null
  state.pcn = null
  state.allPCN = null
  state.isMPP = false
  state.allClasses = null
  state.allFeatures = null
  state.allAccesses = null
  state.selectedPermission = null
  state.selectedPlan = null
  state.selectedPlanData = null
  state.selectedProvider = null
  state.selectedMppDrug = null
  state.selectedPrescriber = null
  state.planSetupData = null
  state.providerSetupData = null
  state.planParamSetupData = null
  state.networkParamSetupData = null
  state.memberFormType = null
  state.selectedMember = null
  state.selectedPlanMembers = null
  state.memberPlanLists = null
  state.drugSetupData = null
  state.groupInformation = null
  state.allGroups = null
  state.claimInfo = null
  state.claimSetupData = {callingApi: false}
  state.groupEditInfo = null
  state.isUpdateStatus = null
  state.selectedGroupFilter = 'Active'
}
