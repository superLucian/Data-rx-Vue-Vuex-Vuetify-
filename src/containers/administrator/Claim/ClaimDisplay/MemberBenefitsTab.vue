<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
      <v-layout column wrap>
        <v-flex xs12>
          <v-card-text class="claim-member-benefit-text">
            Click the Member ID or Name for member level benefits.
          </v-card-text>
        </v-flex>
        <!-- <v-flex xs6 class="pr-5">
          <v-text-field label="Remaining Deductible Amount" :disabled="true" v-model="tabData.remanDeductAmtL"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Remaining Claim Amount" :disabled="true" v-model="tabData['remainClaimAmtL']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Remaining Out of Pocket Amount" :disabled="true" v-model="tabData['remainOopAmt']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <div class="demarcationLine"></div>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="PDT Claim Amount" :disabled="true" v-model="tabData['accumClaimAmtL']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="PDT Out of Pocket Amount" :disabled="true" v-model="tabData['accumOopAmtL']"></v-text-field>
        </v-flex> -->
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'member-benefits-tab',
    props: ['data', 'claimMember'],
    data() {
      return {
        claim: this.data || {},
        memberBenefits: this.claimMember || {},
        tabData: {}
      }
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          this.claim = newVal
          this.tabData = this.getTabData()
        },
        deep: true,
      },
      claimMember: {
        handler(newVal, oldVal) {
          this.memberBenefits = newVal
          this.tabData = this.getTabData()
        },
        deep: true,
      }
    },
    methods: {
      getTabData: function() {
        const { claim } = this
        const maxOopAmt = claim["Max OOP Amt"] || 0;
        const maxClaimAmt = claim["Max Claim Amt"] || 0;
        const maxDeductAmt = claim["Max Deductable Amt"] || 0;

        if (
          this.memberBenefits &&
          this.memberBenefits.length > 0 &&
          (maxOopAmt !== 99999) &&
          (maxClaimAmt !== 99999) &&
          (maxDeductAmt !== 99999)
        ) {
          let num = 0
          const data = {}
          const {
            accum_oop_amt: accumOopAmt = 0,
            accum_claim_amt: accumClaimAmt = 0,
            accum_deduct_amt: accumDeductAmt = 0,
          } = this.memberBenefits[0]
          const remainDeductAmt = Math.round(maxDeductAmt - accumDeductAmt)

          if (maxDeductAmt === 0) {
            data.remanDeductAmtL = "NO LIMIT";
          } else {
            if (remainDeductAmt >= 0) {
              data.remanDeductAmtL = `$${remainDeductAmt.toLocaleString()}.00`
            } else {
              data.remanDeductAmtL  = '$0.00'
            }
          }

          if (maxClaimAmt == 0) {
            data.remainClaimAmtL = "NO LIMIT";
          } else {
            num = Math.round(maxClaimAmt - accumClaimAmt)
            if (num >= 0) {
              data.remainClaimAmtL = `$${num.toLocaleString()}.00`
            } else {
              data.remainClaimAmtL = "$0.00";
            }
          }

          if (maxOopAmt == 0) {
            data.remainOopAmt = "NO LIMIT";
          } else {
            num = Math.round(maxOopAmt - accumOopAmt)
            if (num >= 0) {
              data.remainOopAmt = `$${num.toLocaleString()}.00`
            } else {
              data.remainOopAmt = "$0.00";
            }
          }

          data.accumOopAmtL = `$${accumOopAmt.toLocaleString()}.00`
          data.accumClaimAmtL = `$${accumClaimAmt.toLocaleString()}.00`

          return data
        } else {

          return {
            remainOopAmt: 'NOT AVAILABLE',
            accumOopAmtL: 'NOT AVAILABLE',
            accumClaimAmtL: 'NOT AVAILABLE',
            remanDeductAmtL: 'NOT AVAILABLE',
            remainClaimAmtL: 'NOT AVAILABLE',
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .demarcationLine {
    height: 1px;
    margin: 5px 0;
    background: black;
  }
  .claim-member-benefit-text {
    padding-bottom: 300px
  }
</style>
