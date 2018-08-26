import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import MainRoot from '../components/view/MainRoot.vue'
import Main from '../components/view/Main.vue'

// Administration
import Administrator from '../containers/administrator/Administrator.vue'

// Administration / Claims
import ClaimRoot from '../containers/administrator/Claim/ClaimRoot.vue'
import ClaimList from '../containers/administrator/Claim/ClaimList.vue'
import ClaimDisplay from '../containers/administrator/Claim/ClaimDisplay/index.vue'

// Administration / Claims / Children
import StoreTab from '../containers/administrator/Claim/ClaimDisplay/StoreTab.vue'
import PlanClaimTab from '../containers/administrator/Claim/ClaimDisplay/PlanClaimTab.vue'
import RxTab from '../containers/administrator/Claim/ClaimDisplay/RxTab.vue'
import CompoundTab from '../containers/administrator/Claim/ClaimDisplay/CompoundTab.vue'
import PlanTab from '../containers/administrator/Claim/ClaimDisplay/PlanTab.vue';
import OtherMiscTab from '../containers/administrator/Claim/ClaimDisplay/OtherMiscTab';
import MemberBenefitsTab from '../containers/administrator/Claim/ClaimDisplay/MemberBenefitsTab';
import HcpcsTab from '../containers/administrator/Claim/ClaimDisplay/HcpcsTab';
import ClaimMessageTab from '../containers/administrator/Claim/ClaimDisplay/ClaimMessageTab';

import EDI from '../containers/administrator/EDI/EDI.vue'

// Administration / Formulary
import FormularyRoot from '../containers/administrator/Formulary/FormularyRoot.vue'
import FormularyList from '../containers/administrator/Formulary/FormularyList.vue'
import FormularyDrugs from '../containers/administrator/Formulary/FormularyDrugs.vue'

// Administration / Groups
import GroupList from '../containers/administrator/Groups/GroupList.vue'
import GroupRoot from '../containers/administrator/Groups/GroupRoot.vue'
import GroupEdit from '../containers/administrator/Groups/GroupEdit.vue'
import GroupAdd from '../containers/administrator/Groups/GroupAdd.vue'

// Administrations / Groups / children
import GroupInformation from '../containers/administrator/Groups/Information/GroupInformation.vue'
import GroupParameters from '../containers/administrator/Groups/Parameters/GroupParameters.vue'
import GroupInvoiceAddress from '../containers/administrator/Groups/InvoiceAddress/GroupInvoiceAddress.vue'
import GroupMailAddress from '../containers/administrator/Groups/MailAddress/GroupMailAddress.vue'
import GroupFieldEditList from '../containers/administrator/Groups/FieldEdits/GroupFieldEditList.vue'
import GroupContacts from '../containers/administrator/Groups/Contacts/GroupContacts.vue'
import GroupComments from '../containers/administrator/Groups/Comments/GroupComments.vue'

// Administration / Member
import MemberRoot from '../containers/administrator/Member/MemberRoot.vue'
import MemberList from '../containers/administrator/Member/MemberList.vue'
import MemberEdit from '../containers/administrator/Member/MemberEdit.vue'
import MemberAdd from '../containers/administrator/Member/MemberAdd.vue'

// Administration / Member / children
import MemberOtherInsurance from '../containers/administrator/Member/OtherInsurance/OtherInsurance.vue'
import MemberMember from '../containers/administrator/Member/Member/Member.vue'
import MemberAssign from '../containers/administrator/Member/Assign/Assign.vue'
import MemberDrugList from '../containers/administrator/Member/DrugList/DrugList.vue'
import MemberPersonalInfo from '../containers/administrator/Member/PersonalInfo/PersonalInfo.vue'
import MemberBenefits from '../containers/administrator/Member/Benefits/Benefits.vue'
import MemberInsurance from '../containers/administrator/Member/Insurance/Insurance.vue'
import MemberAddress from '../containers/administrator/Member/Address/Address.vue'
import MemberEmployer from '../containers/administrator/Member/Employer/Employer.vue'
import MemberComments from '../containers/administrator/Member/Comments/Comments.vue'
import MemberPatient from '../containers/administrator/Member/Patient/Patient.vue'
import MemberMedications from '../containers/administrator/Member/Medications/Medications.vue'
import MemberMiscellaneous from '../containers/administrator/Member/Miscellaneous/Miscellaneous.vue'

// Administration / Network
import NetworkRoot from '../containers/administrator/Network/NetworkRoot.vue'
import NetworkList from '../containers/administrator/Network/NetworkList.vue'
import NetworkEdit from '../containers/administrator/Network/NetworkEdit.vue'
import NetworkAdd from '../containers/administrator/Network/NetworkAdd.vue'

// Administration / PCN
import PCNRoot from '../containers/administrator/PCN/PCNRoot.vue'
import PCNList from '../containers/administrator/PCN/PCNList.vue'
import PCNEdit from '../containers/administrator/PCN/PCNEdit.vue'
import PCNAdd from '../containers/administrator/PCN/PCNAdd.vue'


// Administration / Plan
import PlanRoot from '../containers/administrator/Plan/PlanRoot.vue'
import PlanList from '../containers/administrator/Plan/PlanList.vue'
import PlanEdit from '../containers/administrator/Plan/PlanEdit.vue'
import PlanAdd from '../containers/administrator/Plan/PlanAdd.vue'

// Administration / Plan / children
import Plan from '../containers/administrator/Plan/Plan/Plan.vue'
import Compound from '../containers/administrator/Plan/Compound/Compound.vue'
import PlanDawCodes from '../containers/administrator/Plan/DawCodes/DawCodes.vue'
import PlanParameters from '../containers/administrator/Plan/PlanParameters/PlanParameters.vue'
import PricingParameters from '../containers/administrator/Plan/PricingParameters/PricingParameters.vue'
import PlanNetworks from '../containers/administrator/Plan/Networks/Networks.vue'
import PlanDrugs from '../containers/administrator/Plan/PlanDrugs/PlanDrugs.vue'
import PlanFormulary from '../containers/administrator/Plan/PlanFormulary/PlanFormulary.vue'
import PlanFormularyRestrictions from '../containers/administrator/Plan/FormularyRestrictions/FormularyRestrictions.vue'
import PlanMac from '../containers/administrator/Plan/PlanMac/PlanMac.vue'
import PlanRequiredFields from '../containers/administrator/Plan/RequiredFields/RequiredFields.vue'
import PlanSupport from '../containers/administrator/Plan/Support/Support.vue'
import PlanComments from '../containers/administrator/Plan/Comments/Comments.vue'

// Administration / Provider
import ProviderRoot from '../containers/administrator/Provider/ProviderRoot.vue'
import ProviderFind from '../containers/administrator/Provider/ProviderFind.vue'
import ProviderEdit from '../containers/administrator/Provider/ProviderEdit.vue'
import ProviderAdd from '../containers/administrator/Provider/ProviderAdd.vue'

//Administration/ Provider / children
import Provider from '../containers/administrator/Provider/Provider/Provider.vue'
import ProviderPricing from '../containers/administrator/Provider/Pricing/Pricing.vue'
import ProviderMailAddress from '../containers/administrator/Provider/MailAddress/MailAddress.vue'
import ProviderLocation from '../containers/administrator/Provider/Location/Location.vue'
import ProviderContact from '../containers/administrator/Provider/Contact/Contact.vue'
import ProviderComments from '../containers/administrator/Provider/Comments/Comments.vue'

// Administration / Chain
import ChainRoot from '../containers/administrator/Chain/ChainRoot.vue'
import ChainList from '../containers/administrator/Chain/ChainList.vue'
import ChainEdit from '../containers/administrator/Chain/ChainEdit.vue'
import ChainAdd from '../containers/administrator/Chain/ChainAdd.vue'

//Administration/ Chain / children
import Chain from '../containers/administrator/Chain/Chain/Chain.vue'
import ChainProviders from '../containers/administrator/Chain/Providers/Providers.vue'


// Adminstration / Users
import UserRoot from '../containers/administrator/Users/UserRoot.vue'
import UserList from '../containers/administrator/Users/UserList.vue'
import UserEdit from '../containers/administrator/Users/UserEdit.vue'
import UserAdd from '../containers/administrator/Users/UserAdd.vue'

// Adminstration / Users / children
import UserInformation from '../containers/administrator/Users/Information/UserInformation.vue'
import UserPermission from '../containers/administrator/Users/Permission/UserPermission.vue'

// Administration / Diagnosis Codes
import DiagnosisCodesFind from '../containers/administrator/DiagnosisCodes/DiagnosisCodesFind.vue'
import DiagnosisCodesRoot from '../containers/administrator/DiagnosisCodes/DiagnosisCodesRoot.vue'
import DiagnosisCodesAdd from '../containers/administrator/DiagnosisCodes/DiagnosisCodesAdd.vue'
import DiagnosisCodesEdit from '../containers/administrator/DiagnosisCodes/DiagnosisCodesEdit.vue'


// Administration / Prescribers
import PrescribersFind from '../containers/administrator/Prescribers/PrescribersFind.vue'
import PrescribersRoot from '../containers/administrator/Prescribers/PrescribersRoot.vue'
import AddPrescriber from '../containers/administrator/Prescribers/AddPrescriber.vue'
import EditPrescriber from '../containers/administrator/Prescribers/EditPrescriber.vue'

// Administration / PriceIt
import MppDrugRoot from '../containers/administrator/PriceIt/MppDrugRoot.vue'
import MppDrugList from '../containers/administrator/PriceIt/MppDrugList.vue'


// Adminitstration / Prior Auth
import PriorAuthRoot from '../containers/administrator/PriorAuthorization/PriorAuthRoot.vue'
import PriorAuthAdd from '../containers/administrator/PriorAuthorization/PriorAuthAdd.vue'
import PriorAuthEdit from '../containers/administrator/PriorAuthorization/PriorAuthEdit.vue'
import PriorAuthFind from '../containers/administrator/PriorAuthorization/PriorAuthFind.vue'

// Adminitstration  / SpecialPrograms
import SpecProgramsRoot from '../containers/administrator/SpecialPrograms/SpecProgramsRoot.vue'

// Adminitstration  / SpecialPrograms / children
import SpecProgramsList from '../containers/administrator/SpecialPrograms/SpecProgramsList.vue'
import SpecProgramsEdit from '../containers/administrator/SpecialPrograms/SpecProgramsEdit.vue'

// Drugs
import Drugs from '../containers/drugs/Drugs.vue'
import DrugDatabase from '../containers/drugs/DrugsDatabase/DrugDatabase.vue'
import DrugPricing from '../containers/drugs/DrugPricing/DrugPricing.vue'
import HMACPricing from '../containers/drugs/HMACPricing/HMACPricing.vue'
import MACPricing from '../containers/drugs/MACPricing/MACPricing.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: MainRoot,
      children: [
        {
          path: '',
          name: 'main',
          component: Main,
          beforeEnter: guardRoute
        },
        {
          path: 'administration',
          component: Administrator,
          children: [
            {
              path: 'chain',
              component: ChainRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'chain',
                  component: ChainList
                },
                {
                  path: 'add',
                  name: 'chain-add',
                  component: ChainAdd,
                },
                {
                  path: 'edit/:cid',
                  component: ChainEdit,
                  children: [
                    {
                      path: 'chain',
                      name: 'Chain-main',
                      meta: 'chain',
                      component: Chain
                    },
                    {
                      path: 'providers',
                      name: 'Chain-providers',
                      meta: 'providers',
                      component: ChainProviders
                    }
                  ]
                }
              ]
            },
            {
              path: 'claims',
              component: ClaimRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'claims',
                  component: ClaimList,
                  beforeEnter: guardRoute,
                },
                {
                  path: ':cid',
                  component: ClaimList,
                },
              ]
            },
            {
              path: 'diagnosis-codes',
              component: DiagnosisCodesRoot,
              beforeEnter: guardRoute,
              children : [
                {
                  path: "",
                  name: 'diagnosis-codes',
                  component: DiagnosisCodesFind,
                  beforeEnter: guardRoute,
                },
                {
                  path: "add",
                  component: DiagnosisCodesAdd,
                  beforeEnter: guardRoute,
                },
                {
                  path: "edit",
                  component: DiagnosisCodesEdit,
                  beforeEnter: guardRoute,
                },

              ]
            },
            {
              path: 'edi',
              name: 'edi',
              component: EDI,
              beforeEnter: guardRoute
            },
            {
              path: 'formulary',
              component: FormularyRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'formulary',
                  component: FormularyList
                },
                {
                  path: ':fid/:fname',
                  name: 'formulary-drug',
                  component: FormularyDrugs,
                },
                {
                  path: 'add',
                  name: 'formulary-add',
                  component: FormularyList
                }
              ]
            },
            {
              path: 'groups',
              component: GroupRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'groups',
                  component: GroupList,
                  beforeEnter: guardRoute
                },
                {
                  path: 'edit/:group_id',
                  component: GroupEdit,
                  children: [
                    {
                      path: 'information',
                      name: 'group-information',
                      meta: 'information',
                      component: GroupInformation,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'parameters',
                      name: 'group-parameters',
                      meta: 'parameters',
                      component: GroupParameters,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'invoice-address',
                      name: 'group-invoice-address',
                      meta: 'invoice-address',
                      component: GroupInvoiceAddress,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'mail-address',
                      name: 'group-mail-address',
                      meta: 'mail-address',
                      component: GroupMailAddress,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'field-edit-list',
                      name: 'group-field-edit-list',
                      meta: 'field-edit-list',
                      component: GroupFieldEditList,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'contacts',
                      name: 'group-contacts',
                      meta: 'contacts',
                      component: GroupContacts,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'comments',
                      name: 'group-comments',
                      meta: 'comments',
                      component: GroupComments,
                      beforeEnter: guardRoute
                    }
                  ]
                },
                {
                  path: 'add',
                  name: 'group-add',
                  component: GroupAdd,
                  beforeEnter: guardRoute
                }
              ]
            },
            {
              path: 'member',
              component: MemberRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'member',
                  component: MemberList
                },
                {
                  path: 'edit/:mid',
                  component: MemberEdit,
                  children: [
                    {
                      path: 'member',
                      name: 'member-member',
                      meta: 'member',
                      component: MemberMember
                    },
                    {
                      path: 'assign_to_plans',
                      name: 'member-assign',
                      meta: 'assign_to_plans',
                      component: MemberAssign
                    },
                    {
                      path: 'drug_list',
                      name: 'member-drugList',
                      meta: 'drug_list',
                      component: MemberDrugList
                    },
                    {
                      path: 'personal_info',
                      name: 'member-personalInfo',
                      meta: 'personal_info',
                      component: MemberPersonalInfo
                    },
                    {
                      path: 'benefits',
                      name: 'member-benefits',
                      meta: 'benefits',
                      component: MemberBenefits
                    },
                    {
                      path: 'insurance',
                      name: 'member-insurance',
                      meta: 'insurance',
                      component: MemberInsurance
                    },
                    {
                      path: 'address',
                      name: 'member-address',
                      meta: 'address',
                      component: MemberAddress
                    },
                    {
                      path: 'employer',
                      name: 'member-employer',
                      meta: 'employer',
                      component: MemberEmployer
                    },
                    {
                      path: 'comments',
                      name: 'member-comments',
                      meta: 'comments',
                      component: MemberComments
                    },
                    {
                      path: 'otherInsurance',
                      name: 'member-otherInsurance',
                      meta: 'otherInsurance',
                      component: MemberOtherInsurance
                    },
                    {
                      path: 'patient',
                      name: 'member-patient',
                      meta: 'patient',
                      component: MemberPatient
                    },
                    {
                      path: 'medications',
                      name: 'member-medications',
                      meta: 'medications',
                      component: MemberMedications
                    },
                    {
                      path: 'miscellaneous',
                      name: 'member-miscellaneous',
                      meta: 'miscellaneous',
                      component: MemberMiscellaneous
                    },
                  ]
                },
                {
                  path: 'add',
                  name: 'member-add',
                  component: MemberAdd
                }
              ]
            },
            {
              path: 'network',
              component: NetworkRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'network',
                  component: NetworkList,
                  beforeEnter: guardRoute
                },
                {
                  path: 'add',
                  name: 'network-add',
                  component: NetworkAdd,
                },
                {
                  path: 'edit/:netid',
                  name: 'network-edit',
                  component: NetworkEdit,
                }
              ]
            },
            {
              path: 'pcns',
              component: PCNRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'pcns',
                  component: PCNList,
                  beforeEnter: guardRoute
                },
                {
                  path: 'add',
                  name: 'pcn-add',
                  component: PCNAdd,
                },
                {
                  path: 'edit/:pcc',
                  name: 'pcn-edit',
                  component: PCNEdit,
                }
              ]
            },
            {
              path: 'plan',
              component: PlanRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'Plan',
                  component: PlanList
                },
                {
                  path: 'edit/:uid',
                  component: PlanEdit,
                  children: [
                    {
                      path: 'plan',
                      name: 'Plan-main',
                      meta: 'plan',
                      component: Plan
                    },
                    {
                      path: 'compound',
                      name: 'Plan-compound',
                      meta: 'compound',
                      component: Compound
                    }, {
                      path: 'daw_codes',
                      name: 'Plan-daw-codes',
                      meta: 'daw_codes',
                      component: PlanDawCodes
                    },
                    {
                      path: 'plan_parameters',
                      name: 'Plan-parameters',
                      meta: 'plan_parameters',
                      component: PlanParameters
                    },
                    {
                      path: 'pricing_parameters',
                      name: 'Plan-pricing-parameters',
                      meta: 'pricing_parameters',
                      component: PricingParameters
                    },
                    {
                      path: 'plan_drugs',
                      name: 'Plan-drugs',
                      meta: 'plan_drugs',
                      component: PlanDrugs
                    }, {
                      path: 'networks',
                      name: 'Plan-networks',
                      meta: 'networks',
                      component: PlanNetworks
                    }, {
                      path: 'plan_formulary',
                      name: 'Plan-formulary',
                      meta: 'plan_formulary',
                      component: PlanFormulary
                    }, {
                      path: 'plan_formulary_restrictions',
                      name: 'Plan-formulary-restrictions',
                      meta: 'plan_formulary_restrictions',
                      component: PlanFormularyRestrictions
                    }, {
                      path: 'plan_mac',
                      name: 'Plan-mac',
                      meta: 'plan_mac',
                      component: PlanMac
                    },
                    {
                      path: 'required_fields',
                      name: 'Plan-required-fields',
                      meta: 'required_fields',
                      component: PlanRequiredFields
                    },
                    {
                      path: 'support',
                      name: 'Plan-support',
                      meta: 'support',
                      component: PlanSupport
                    },
                    {
                      path: 'comments',
                      name: 'Plan-Comments',
                      meta: 'comments',
                      component: PlanComments
                    }
                  ]
                },
                {
                  path: 'add',
                  name: 'Plan-add',
                  component: PlanAdd
                }
              ]
            },
            {
              path: 'prescribers',
              component: PrescribersRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: "",
                  name: "prescribers",
                  component: PrescribersFind,
                  beforeEnter: guardRoute,
                },
                {
                  path: "add",
                  name: "prescribers-add",
                  component: AddPrescriber,
                  beforeEnter: guardRoute,
                },
                {
                  path: 'edit/:did',
                  name: "prescribers-edit",
                  component: EditPrescriber,
                  beforeEnter: guardRoute,
                },

              ]
            },
            {
              path: 'mpp-drug',
              component: MppDrugRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'mpp-drug',
                  component: MppDrugList,
                  beforeEnter: guardRoute,
                }
              ]
            },
            {
              path: 'prior-authorization',
              component: PriorAuthRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: "",
                  name: "prior-authorization",
                  component: PriorAuthFind,
                },
                {
                  path: "add",
                  name: 'prior-auth-add',
                  component: PriorAuthAdd,
                },
                {
                  path: 'edit/:auth_id',
                  name: 'prior-auth-edit',
                  component: PriorAuthEdit,
                }
              ]
            },
            {
              path: 'provider',
              component: ProviderRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'provider',
                  component: ProviderFind
                },
                {
                  path: 'add',
                  name: 'provider-add',
                  component: ProviderAdd,
                },
                {
                  path: 'edit/:pid',
                  component: ProviderEdit,
                  children: [
                    {
                      path: 'provider',
                      name: 'Provider-main',
                      meta: 'provider',
                      component: Provider
                    },
                    {
                      path: 'mail_address',
                      name: 'Provider-mail-address',
                      meta: 'mail_address',
                      component: ProviderMailAddress
                    },
                    {
                      path: 'location',
                      name: 'Provider-location',
                      meta: 'location',
                      component: ProviderLocation
                    },
                    {
                      path: 'contact',
                      name: 'Provider-contact',
                      meta: 'contact',
                      component: ProviderContact
                    },
                    {
                      path: 'comments',
                      name: 'Provider-comments',
                      meta: 'comments',
                      component: ProviderComments
                    },
                    {
                      path: 'pricing',
                      name: 'Provider-price-it',
                      meta: 'pricing',
                      component: ProviderPricing
                    },
                  ]
                }
              ]
            },
            {
              path: 'special-programs',
              component: SpecProgramsRoot,
              children: [
                {
                  path: '',
                  name: 'special-programs',
                  component: SpecProgramsList,
                  beforeEnter: guardRoute,
                },
                {
                  path: 'edit/:spid',
                  name: 'edit',
                  component: SpecProgramsEdit,
                  beforeEnter: guardRoute,
                },
              ]
            },
            {
              path: 'users',
              component: UserRoot,
              beforeEnter: guardRoute,
              children: [
                {
                  path: '',
                  name: 'users',
                  component: UserList,
                  beforeEnter: guardRoute
                },
                {
                  path: 'edit/:uid',
                  component: UserEdit,
                  children: [
                    {
                      path: 'information',
                      name: 'user-information',
                      meta: 'information',
                      component: UserInformation,
                      beforeEnter: guardRoute
                    },
                    {
                      path: 'permission',
                      name: 'user-permission',
                      meta: 'permission',
                      component: UserPermission,
                      beforeEnter: guardRoute
                    }
                  ]
                },
                {
                  path: 'add',
                  name: 'user-add',
                  component: UserAdd,
                  beforeEnter: guardRoute
                }
              ]
            }
          ]
        },
        {
          path: 'drugs',
          component: Drugs,
          children: [
            {
              path: 'find',
              name: 'drug-database',
              component: DrugDatabase,
              beforeEnter: guardRoute
            },
            {
              path: 'pricing',
              name: 'drug-pricing',
              component: DrugPricing,
              beforeEnter: guardRoute
            },
            {
              path: 'hmac-pricing',
              name: 'hmac-pricing',
              component: HMACPricing,
              beforeEnter: guardRoute
            },
            {
              path: 'mac-pricing',
              name: 'mac-pricing',
              component: MACPricing,
              beforeEnter: guardRoute
            }
          ]
        }
      ]
    }]
})

function guardRoute(to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const state = router.app.$options.store.state
  if (!state.auth.isLoggedIn) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

export default router
