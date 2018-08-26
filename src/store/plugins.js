import {STORAGE_KEY} from './state'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = {
      auth: state.auth,
      user: state.user,
      pcn: state.pcn,
      isMPP: state.isMPP,
      allClasses: state.allClasses,
      allFeatures: state.allFeatures,
      allAccesses: state.allAccesses,
      selectedPermission: state.selectedPermission,
      selectedPlan: state.selectedPlan,
      selectedPlanData: state.selectedPlanData,
      planSetupData: state.planSetupData,
      selectedProvider: state.selectedProvider,
      selectedMppDrug: state.selectedMppDrug,
      selectedPrescriber: state.selectedPrescriber,
      selectedChain: state.selectedChain,
      providerSetupData: state.providerSetupData,
      networkParamSetupData: state.networkParamSetupData,
      memberFormType: state.memberFormType,
      selectedMember: state.selectedMember,
      selectedPlanMembers: state.selectedPlanMembers,
      memberPlanLists: state.memberPlanLists,
      drugSetupData: state.drugSetupData,
      userInformation: state.userInformation,
      userPermission: state.userPermission,
      groupInformation: state.groupInformation,
      allGroups: state.allGroups,
      allSpecialPrograms: state.allSpecialPrograms,
      claimInfo: state.claimInfo,
      claimSetupData: state.claimSetupData,
      groupEditInfo: state.groupEditInfo,
      isUpdateStatus: state.isUpdateStatus,
      selectedGroupFilter: state.selectedGroupFilter
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedData))

    if (mutation.type === 'CLEAR_ALL_DATA') {
      localStorage.removeItem(STORAGE_KEY)
    }
  })
}

// TODO: setup env
// export default process.env.NODE_ENV !== 'production' ? [localStoragePlugin] : [localStoragePlugin]
export default [localStoragePlugin]
