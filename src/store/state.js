// Set the key we'll use in local storage.
// Go to Chrome dev tools, application tab, click "Local Storage" and "http://localhost:8080"
// and you'll see this key set below (if logged in):
export const STORAGE_KEY = 'data-rx'

let syncedData = {
  auth: {
    isLoggedIn: false
  },
  user: null,
  pcn: null,
  isMPP: true,
  allPCN: null,
  allClasses: null,
  allFeatures: null,
  allAccesses: null,
  userInformation: null,
  userPermission: null,
  selectedPermission: null,
  selectedPlan: null,
  selectedPlanData: null,
  selectedProvider: null,
  selectedMppDrug: null,
  selectedPrescriber: null,
  selectedChain: null,
  planSetupData: null,
  planParamSetupData: null,
  networkParamSetupData: null,
  memberFormType: null,
  selectedMember: null,
  selectedPlanMembers: null,
  memberPlanLists: null,
  drugSetupData: null,
  groupInformation: null,
  allGroups: null,
  allSpecialPrograms: null,
  claimInfo: null,
  claimSetupData: {
    callingApi: false
  },
  groupEditInfo: null,
  isUpdateStatus: null,
  selectedGroupFilter: 'Active'
}

const notSyncedData = {}

// Sync with local storage.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

// Merge data and export it.
export const state = Object.assign(syncedData, notSyncedData)
