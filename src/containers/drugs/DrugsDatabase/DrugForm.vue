<template>
  <main>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :width="1000"
      :height="500"
      :closeOnClickMask="true"
      v-on:hide="close"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          {{ type == 'view' ? 'Display Drug' : 'Drug Add' }}
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap v-if="type=='add'">
        <v-container fluid class="pb-0">
          <v-tabs v-model="active">
            <v-tabs-bar class="transparent">
              <v-tabs-slider class="active-line"></v-tabs-slider>
              <v-tabs-item v-for="tab in tabs_list" :key="tab" :href="'#' + tab" ripple>
                {{ tab }}
              </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content id="Drug Information" class="my-sub-scroll-enabled">
                <v-form ref="form" fluid class="px-0 pt-3">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select :items="drug_type_cd_list" v-model="detailedInfo['drug_type_cd']" label="*Drug Type:"
                                  @input="changeDrugType"></v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6 v-if="isAllGroup">
                      <v-card-text class="py-0">
                        <v-select
                          v-bind:items="groupList"
                          v-model="detailedInfo['group_id']"
                          label="Group"
                          item-text="name_txt"
                          item-value="group_id"
                          :rules="[rules.required]"
                          required
                        >
                        </v-select>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-text-field label="NDC" v-model="detailedInfo['ndc']" type="Number"
                                      :disabled="type=='view'" :rules="[rules.required]"
                                      required></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-text-field label="Mfg" v-model="detailedInfo['mfg_name_txt']"
                                      :disabled="type=='view'" :rules="[rules.required]"
                                      required></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-text-field label="Drug Name" v-model="detailedInfo['product_name_txt']"
                                      :disabled="type=='view'" :rules="[rules.required]"
                                      required></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-text-field label="Additional Info" v-model="detailedInfo['additional_desc_txt']"
                                      :disabled="type=='view'"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select
                          v-bind:items="productTypeList"
                          v-model="detailedInfo['product_type_cd']"
                          label="Product Type"
                          :rules="[rules.required]"
                          required
                          bottom>
                        </v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select
                          v-bind:items="$store.state.drugSetupData && $store.state.drugSetupData.roa_list || []"
                          v-model="detailedInfo['roa_cd']"
                          label="ROA"
                          :rules="[rules.required]"
                          required
                          item-text="Description"
                          item-value="Code"
                        >
                          <template slot="selection" slot-scope="data">
                            {{ data.item.Code }} - {{ data.item.Description }}
                          </template>
                          <template slot="item" slot-scope="data">
                            {{ data.item.Code }} - {{ data.item.Description }}
                          </template>
                        </v-select>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select
                          v-bind:items="dosageList"
                          v-model="detailedInfo['form_cd']"
                          label="Dosage"
                          item-text="text"
                          item-value="code"
                          :rules="[rules.required]"
                          required
                        >
                        </v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select
                          v-bind:items="deaClassList"
                          v-model="detailedInfo['dea_class_cd']"
                          label="DEA Class"
                          :rules="[rules.required]"
                          required
                        >
                        </v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-text-field label="Strength:" v-model="detailedInfo['strength_txt']"
                                      :disabled="type=='view'"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text>
                        <p>Source</p>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-radio-group v-model="detailedInfo['single_src_ind']" row>
                              <v-radio label="Single Source" value="Y" :disabled="type=='view'"></v-radio>
                              <v-radio label="Multi-Source" value="N" :disabled="type=='view'"></v-radio>
                            </v-radio-group>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-flex>

                    <v-flex xs6>
                      <v-card-text>
                        <p>Form</p>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-radio-group v-model="detailedInfo['form_type_cd']" row>
                              <v-radio label="Solid" value="S" :disabled="type=='view'"></v-radio>
                              <v-radio label="Liquid" value="L" :disabled="type=='view'"></v-radio>
                            </v-radio-group>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-flex>

                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text>
                        <p>Type</p>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-radio-group v-model="detailedInfo['maint_drug_ind']" row>
                              <v-radio label="Maintenance Med" value="Y" :disabled="type=='view'"></v-radio>
                              <v-radio label="Acute Med" value="N" :disabled="type=='view'"></v-radio>
                            </v-radio-group>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-flex>

                    <v-flex xs6>
                      <v-card-text>
                        <p>Unit of Measure</p>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-radio-group v-model="detailedInfo['std_uom_cd']" row>
                              <v-radio label="EA" value="EA" :disabled="type=='view'"></v-radio>
                              <v-radio label="ML" value="ML" :disabled="type=='view'"></v-radio>
                              <v-radio label="GM" value="GM" :disabled="type=='view'"></v-radio>
                            </v-radio-group>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-card-text>
                      <p>Unit price / Price Effective Date</p>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-flex xs3>
                          <v-card-text>
                            <p>AWP</p>
                            <v-text-field label="Unit Price" v-model="detailedInfo['awp_curr_unit_price_amt']"
                                          :disabled="type=='view'" type="number"></v-text-field>
                            <date-picker
                              v-model="detailedInfo['awp_curr_price_effect_dt']"
                              label="Price Effective Date"
                            ></date-picker>
                          </v-card-text>
                        </v-flex>

                        <v-flex xs3>
                          <v-card-text>
                            <p>Direct</p>
                            <v-text-field label="Unit Price" v-model="detailedInfo['dp_curr_unit_price_amt']"
                                          :disabled="type=='view'" type="number"></v-text-field>
                            <date-picker
                              v-model="detailedInfo['dp_curr_price_effect_dt']"
                              label="Price Effective Date"
                            ></date-picker>
                          </v-card-text>
                        </v-flex>

                        <v-flex xs3>
                          <v-card-text>
                            <p>HFCA</p>
                            <v-text-field label="Unit Price" v-model="detailedInfo['mac_curr_unit_price_amt']"
                                          :disabled="type=='view'" type="number"></v-text-field>
                            <date-picker
                              v-model="detailedInfo['mac_curr_price_effect_dt']"
                              label="Price Effective Date"
                            ></date-picker>
                          </v-card-text>
                        </v-flex>

                        <v-flex xs3>
                          <v-card-text>
                            <p>WAC</p>
                            <v-text-field label="Unit Price" v-model="detailedInfo['wac_curr_unit_price_amt']"
                                          :disabled="type=='view'" type="number"></v-text-field>
                            <date-picker
                              v-model="detailedInfo['wac_curr_price_effect_dt']"
                              label="Price Effective Date"
                            ></date-picker>
                          </v-card-text>
                        </v-flex>

                      </v-layout>
                    </v-card-text>
                  </v-layout>
                </v-form>
              </v-tabs-content>
              <v-tabs-content id="Compound Information" class="my-sub-scroll-enabled">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-card-text>
                      <p>HCPCS</p>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-card-text class="py-0">
                          <v-text-field label="HCPCS" v-model="detailedInfo['hcpcs']"></v-text-field>
                        </v-card-text>
                        <v-card-text class="py-0">
                          <v-text-field label="Mod 1" v-model="detailedInfo['hcpcsMod1']"></v-text-field>
                        </v-card-text>
                        <v-card-text class="py-0">
                          <v-text-field label="Mod 2" v-model="detailedInfo['hcpcsMod2']"></v-text-field>
                        </v-card-text>
                        <v-card-text class="py-0">
                          <v-text-field label="Mod 3" v-model="detailedInfo['hcpcsMod3']"></v-text-field>
                        </v-card-text>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12>
                          <v-card-text class="py-0">
                            <date-picker
                              label="Start Date"
                              v-model="detailedInfo['hcpcsStartDt']"
                            >
                            </date-picker>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-card-text class="hasEndDate-container">
                            <v-checkbox label="Has an end date?" v-model="hasEndDate"></v-checkbox>
                          </v-card-text>
                        </v-flex>
                      </v-layout>

                      <v-layout row v-if="hasEndDate">
                        <v-flex xs12>
                          <v-card-text class="py-0">
                            <date-picker
                              label="End Date"
                              v-model="detailedInfo['hcpcsEndDt']"
                            >
                            </date-picker>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text>
                      <p>Age Limits</p>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-card-text class="py-0">
                            <v-text-field label="Minimum Age" v-model="detailedInfo['minAge']"
                                          type='number'></v-text-field>
                          </v-card-text>
                        </v-flex>
                        <v-flex xs6>
                          <v-card-text class="py-0">
                            <v-text-field label="Maximum Age" v-model="detailedInfo['maxAge']"
                                          type='number'></v-text-field>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-card-text>
                      <p>Quantity Limits</p>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-card-text class="py-0">
                            <v-text-field label="Minimum Quantity" v-model="detailedInfo['minQty']"
                                          type='number'></v-text-field>
                          </v-card-text>
                        </v-flex>
                        <v-flex xs6>
                          <v-card-text class="py-0">
                            <v-text-field label="Maximum Quantity" v-model="detailedInfo['maxQty']"
                                          type='number'></v-text-field>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-card-text>
                      <p>External Requirements</p>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-card-text class="pb-0">
                            <v-checkbox label="Documentation Required"
                                        v-model="detailedInfo['invoiceInd']"></v-checkbox>
                          </v-card-text>
                        </v-flex>
                        <v-flex xs12>
                          <v-card-text class="py-0">
                            <v-checkbox label="Requires a Prior Authorization"
                                        v-model="detailedInfo['priorAuthInd']"></v-checkbox>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout>
                      <v-flex xs6>
                        <v-card-text>
                          <p>Quantity Pricing</p>
                          <v-divider></v-divider>

                          <v-card-text class="pb-0">
                            <v-checkbox label="Use Quantity Pricing"
                                        v-model="useQuantityPricing"></v-checkbox>
                          </v-card-text>

                          <v-card-text class="py-0" v-if="useQuantityPricing">
                            <v-text-field label="Quantity" v-model="detailedInfo['quantity']"
                                          type="number"></v-text-field>
                          </v-card-text>
                          <v-card-text class="py-0" v-else>
                            <v-text-field label="Quantity" v-model="detailedInfo['quantity']" type="number"
                                          disabled></v-text-field>
                          </v-card-text>
                        </v-card-text>
                      </v-flex>
                      <v-flex xs6>
                        <v-card-text>
                          <p>Quantity Conversion</p>
                          <v-divider></v-divider>
                          <v-card-text class="pb-0">
                            <v-checkbox label="Requires a Quantity Conversion"
                                        v-model="requireQuantityConversation"></v-checkbox>
                          </v-card-text>

                          <v-card-text class="py-0" v-if="requireQuantityConversation">
                            <v-text-field label="Qty Conversion Factor" v-model="detailedInfo['conversionFactor']"
                                          type='number'></v-text-field>
                          </v-card-text>
                          <v-card-text class="py-0" v-else>
                            <v-text-field label="Qty Conversion Factor" v-model="detailedInfo['conversionFactor']"
                                          type='number' disabled></v-text-field>
                          </v-card-text>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-card-text class="py-0">
                    <v-text-field label="Local use" v-model="detailedInfo['localUse']"></v-text-field>
                  </v-card-text>
                </v-layout>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
        </v-container>
      </v-layout>
      <v-container fluid class="my-sub-scroll-enabled px-0" v-else>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="NDC:" v-model="info['NDC']" type="Number" :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Mfg:" v-model="info['Mfg']" :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Drug Name:" v-model="info['Product Name']" :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Additional Info:" v-model="detailedInfo['additional_desc_txt']"
                            :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="productTypeList"
                v-model="info['Product Type Desc']"
                label="Product Type"
                item-text="text"
                item-value="code"
                bottom>
              </v-select>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="$store.state.drugSetupData && $store.state.drugSetupData.roa_list || []"
                v-model="detailedInfo['roa_cd']"
                label="ROA"
                :rules="[rules.required]"
                required
                item-text="Description"
                item-value="Code"
              >
                <template slot="selection" slot-scope="data">
                  {{ data.item.Code }} - {{ data.item.Description }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ data.item.Code }} - {{ data.item.Description }}
                </template>
              </v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="deaClassList"
                v-model="detailedInfo['dea_class_cd']"
                label="DEA Class"
                :rules="[rules.required]"
                required
              >
              </v-select>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0">
              {{detailedInfo['form_cd']}}
              <v-select
                v-bind:items="dosageList"
                v-model="detailedInfo['form_cd']"
                label="Dosage"
                item-text="text"
                item-value="code"
                :rules="[rules.required]"
                required
              >
              </v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Package Size:" v-model="detailedInfo['std_pkg_size']"
                            :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Strength:" v-model="detailedInfo['strength_txt']"
                            :disabled="type=='view'"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text>
              <p>Source</p>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group v-model="detailedInfo['single_src_ind']" row>
                    <v-radio label="Single Source" value="Y" :disabled="type=='view'"></v-radio>
                    <v-radio label="Multi-Source" value="N" :disabled="type=='view'"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

          <v-flex xs6>
            <v-card-text>
              <p>Form</p>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group v-model="detailedInfo['form_type_cd']" row>
                    <v-radio label="Solid" value="S" :disabled="type=='view'"></v-radio>
                    <v-radio label="Liquid" value="L" :disabled="type=='view'"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text>
              <p>Type</p>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group v-model="detailedInfo['maint_drug_ind']" row>
                    <v-radio label="Maintenance Med" value="Y" :disabled="type=='view'"></v-radio>
                    <v-radio label="Acute Med" value="N" :disabled="type=='view'"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

          <v-flex xs6>
            <v-card-text>
              <p>Unit of Measure</p>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group v-model="detailedInfo['std_uom_cd']" row>
                    <v-radio label="EA" value="EA" :disabled="type=='view'"></v-radio>
                    <v-radio label="ML" value="ML" :disabled="type=='view'"></v-radio>
                    <v-radio label="GM" value="GM" :disabled="type=='view'"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-card-text>
            <p>Unit price / Price Effective Date</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs3>
                <v-card-text class="pb-0">
                  <p>AWP</p>
                  <v-text-field label="Unit Price" v-model="detailedInfo['awp_curr_unit_price_amt']"
                                :disabled="type=='view'"></v-text-field>
                  <v-text-field label="Price Effective Date" v-model="detailedInfo['awp_curr_price_effect_dt']"
                                :disabled="type=='view'" hide-details></v-text-field>
                </v-card-text>
              </v-flex>

              <v-flex xs3>
                <v-card-text class="pb-0">
                  <p>Direct</p>
                  <v-text-field label="Unit Price" v-model="detailedInfo['dp_curr_unit_price_amt']"
                                :disabled="type=='view'"></v-text-field>
                  <v-text-field label="Price Effective Date" v-model="detailedInfo['dp_curr_price_effect_dt']"
                                :disabled="type=='view'" hide-details></v-text-field>
                </v-card-text>
              </v-flex>

              <v-flex xs3>
                <v-card-text class="pb-0">
                  <p>HFCA</p>
                  <v-text-field label="Unit Price" v-model="detailedInfo['mac_curr_unit_price_amt']"
                                :disabled="type=='view'"></v-text-field>
                  <v-text-field label="Price Effective Date" v-model="detailedInfo['mac_curr_price_effect_dt']"
                                :disabled="type=='view'" hide-details></v-text-field>
                </v-card-text>
              </v-flex>

              <v-flex xs3>
                <v-card-text class="pb-0">
                  <p>WAC</p>
                  <v-text-field label="Unit Price" v-model="detailedInfo['wac_curr_unit_price_amt']"
                                :disabled="type=='view'"></v-text-field>
                  <v-text-field label="Price Effective Date" v-model="detailedInfo['wac_curr_price_effect_dt']"
                                :disabled="type=='view'" hide-details></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn v-if="type=='add'" color="primary-color" @click.native="save()">Save</v-btn>
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </Vodal>
  </main>
</template>

<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import drugServices from '../../../services/drug/drugServices'
  import claimServices from '../../../services/claim/claimServices'
  import {
    convertStringToPickerFormat,
    stringToDate
  } from '../../../components/utils/DateMethods'
  import store from '../../../store'
  import DatePicker from "../../../components/common/DatePicker.vue"

  const dosageList = [
    {'code': '1', 'text': '1   - Aerosol Powder Breath Activate'},
    {'code': '10', 'text': '10  - Conc'},
    {'code': '13', 'text': '13  - Cap CR'},
    {'code': '15', 'text': '15  - EC Cap (Obsolete)'},
    {'code': '16', 'text': '16  - Cap DR Particles'},
    {'code': '17', 'text': '17  - Capsule Sprinkle'},
    {'code': '2', 'text': '2   - Aerosol Breath Activated'},
    {'code': '20', 'text': '20  - Douche (Obsolete)'},
    {'code': '21', 'text': '21  - Douche Pow (Obsolete)'},
    {'code': '22', 'text': '22  - Douche Sol (Obsolete)'},
    {'code': '25', 'text': '25  - Diaphragm'},
    {'code': '28', 'text': '28  - Enema'},
    {'code': '3', 'text': '3   - Aerosol'},
    {'code': '36', 'text': '36  - Granules Effervescent'},
    {'code': '39', 'text': '39  - Inhaler'},
    {'code': '41', 'text': '41  - Insert'},
    {'code': '42', 'text': '42  - IUD'},
    {'code': '48', 'text': '48  - Lollipop'},
    {'code': '49', 'text': '49  - Liquid CR'},
    {'code': '50', 'text': '50  - Misc'},
    {'code': '51', 'text': '51  - Nebu Soln'},
    {'code': '52', 'text': '52  - Ocular System (Obsolete)'},
    {'code': '57', 'text': '57  - Powder Effer'},
    {'code': '61', 'text': '61  - Patch 24HR'},
    {'code': '62', 'text': '62  - Patch 72HR'},
    {'code': '63', 'text': '63  - Patch Biweekly'},
    {'code': '64', 'text': '64  - Patch Weekly'},
    {'code': '66', 'text': '66  - Ring'},
    {'code': '71', 'text': '71  - Recon Soln'},
    {'code': '72', 'text': '72  - Spirit'},
    {'code': '74', 'text': '74  - Strip'},
    {'code': '75', 'text': '75  - SL Tab'},
    {'code': '84', 'text': '84  - Tar'},
    {'code': '88', 'text': '88  - Tablet Dispersible'},
    {'code': '92', 'text': '92  - Tablet Soluble'},
    {'code': '93', 'text': '93  - Transdermal Sys'},
    {'code': '96', 'text': '96  - Troche'},
    {'code': '99', 'text': '99  - Whip (Obsolete)'},
    {'code': 'ACC', 'text': 'ACC - Accessory'},
    {'code': 'AER', 'text': 'AER - Aerosol Liquid'},
    {'code': 'ARO', 'text': 'ARO - Aerosol Powder'},
    {'code': 'BAN', 'text': 'BAN - Bandage'},
    {'code': 'BAR', 'text': 'BAR - Bar'},
    {'code': 'BEA', 'text': 'BEA - Beads'},
    {'code': 'C12', 'text': 'C12 - Capsule, Extended Release, 12 HR'},
    {'code': 'C24', 'text': 'C24 - Capsule, Extended Release, 24 HR'},
    {'code': 'CAK', 'text': 'CAK - Cake'},
    {'code': 'CAP', 'text': 'CAP - Capsule'},
    {'code': 'CER', 'text': 'CER - Capsule, Extended Release'},
    {'code': 'CHI', 'text': 'CHI - Chip'},
    {'code': 'CRE', 'text': 'CRE - Cream'},
    {'code': 'CRYS', 'text': 'CRY - Crystal'},
    {'code': 'CTB', 'text': 'CTB - Tablet, Chewable'},
    {'code': 'DEV', 'text': 'DEV - Device'},
    {'code': 'DRE', 'text': 'DRE - Dressing'},
    {'code': 'DSK', 'text': 'DSK - Disk'},
    {'code': 'ECC', 'text': 'ECC - Capsule, Delayed Release'},
    {'code': 'ECT', 'text': 'ECT - Tablet, Enteric Coated'},
    {'code': 'ELI', 'text': 'ELI - Elixir'},
    {'code': 'EMO', 'text': 'EMO - Emollient Cream'},
    {'code': 'EMU', 'text': 'EMU - Emulsion'},
    {'code': 'FDS', 'text': 'FDS - Food, Solid'},
    {'code': 'FIL', 'text': 'FIL - Film'},
    {'code': 'FLA', 'text': 'FLA - Flake'},
    {'code': 'FOA', 'text': 'FOA - Foam'},
    {'code': 'GAS', 'text': 'GAS - Gas'},
    {'code': 'GEF', 'text': 'GEF - Powder, Effervescent'},
    {'code':'GEL','text':'GEL - Gel/Jelly'},
    {'code': 'GER', 'text': 'GER - Powder for Suspension, Extended Release'},
    {'code': 'GFS', 'text': 'GFS - Gel Forming Solution'},
    {'code': 'GRA', 'text': 'GRA - Granule'},
    {'code': 'GUM', 'text': 'GUM - Gum'},
    {'code': 'ICR', 'text': 'ICR - Insert, Extended Release'},
    {'code': 'INJ', 'text': 'INJ - Injectable'},
    {'code': 'IMP', 'text': 'IMP - Implant'},
    {'code': 'KIT', 'text': 'KIT - Kit'},
    {'code': 'LEA', 'text': 'LEA - Leaf'},
    {'code': 'LIQ', 'text': 'LIQ - Liquid'},
    {'code': 'LOT', 'text': 'LOT - Lotion'},
    {'code': 'LOZ', 'text': 'LOZ - Lozenge/Troche'},
    {'code': 'LUM', 'text': 'LUM - Lump'},
    {'code': 'MISC', 'text': 'MISC - Misc'},
    {'code': 'NMA', 'text': 'NMA - Enema'},
    {'code': 'ODT', 'text': 'ODT - Tablet, Disintegrating'},
    {'code': 'OIL', 'text': 'OIL - Oil'},
    {'code': 'OIN', 'text': 'OIN - Ointment'},
    {'code': 'PAD', 'text': 'PAD - Pad'},
    {'code': 'PAS', 'text': 'PAS - Paste'},
    {'code': 'PDR', 'text': 'PDR - Powder for Suspension'},
    {'code': 'PDS', 'text': 'PDS - Powder for Solution'},
    {'code': 'PEL', 'text': 'PEL - Pellet'},
    {'code': 'PI1', 'text': 'PI1 - Powder for Suspension, 1 Month'},
    {'code': 'PI3', 'text': 'PI3 - Powder for Suspension, 3 Month'},
    {'code': 'PI4', 'text': 'PI4 - Powder for Suspension, 4 Month'},
    {'code': 'PKT', 'text': 'PKT - Packet'},
    {'code': 'POD', 'text': 'POD - Pod'},
    {'code': 'POW', 'text': 'POW - Powder'},
    {'code': 'PRO', 'text': 'PRO - Prophylactic'},
    {'code': 'PUD', 'text': 'PUD - Pudding'},
    {'code': 'SER', 'text': 'SER - Suspension, Extended Release'},
    {'code': 'SGL', 'text': 'SGL - Capsule, Liquid Filled'},
    {'code': 'SHA', 'text': 'SHA - Shampoo'},
    {'code': 'SHE', 'text': 'SHE - Sheet'},
    {'code': 'SOA', 'text': 'SOA - Soap'},
    {'code': 'SOL', 'text': 'SOL - Solution'},
    {'code': 'SPE', 'text': 'SPE - Suppository, Extended Release'},
    {'code': 'SPG', 'text': 'SPG - Sponge'},
    {'code': 'SPR', 'text': 'SPR - Spray'},
    {'code': 'STI', 'text': 'STI - Stick'},
    {'code': 'SUP', 'text': 'SUP - Suppository'},
    {'code': 'SUS', 'text': 'SUS - Suspension'},
    {'code': 'SWA', 'text': 'SWA - Swab'},
    {'code': 'SYR', 'text': 'SYR - Syrup'},
    {'code': 'T12', 'text': 'T12 - Tablet, Extended Release, 12 HR'},
    {'code': 'T24', 'text': 'T24 - Tablet, Extended Release, 24 HR'},
    {'code': 'TAB', 'text': 'TAB - Tablet'},
    {'code': 'TAM', 'text': 'TAM - Tampon'},
    {'code': 'TAP', 'text': 'TAP - Tape'},
    {'code': 'TCP', 'text': 'TCP - Tablet, Delayed Release'},
    {'code': 'TDM', 'text': 'TDM - Patch, Extended Release'},
    {'code': 'TEF', 'text': 'TEF - Tablet, Effervescent'},
    {'code': 'TER', 'text': 'TER - Tablet, Extended Release'},
    {'code': 'TES', 'text': 'TES - Test'},
    {'code': 'TIN', 'text': 'TIN - Tincture'},
    {'code': 'WAF', 'text': 'WAF - Wafer'},
    {'code': 'WAX', 'text': 'WAX - Wax'},
  ]
  const productTypeList = [
    {'code': 'Rx/Brand Name', 'text': '01 - Rx/Brand Name'},
    {'code': 'Rx/Generic', 'text': '02 - Rx/Generic'},
    {'code': 'Surgical/Device', 'text': '03 - Surgical/Device'},
    {'code': 'Rx/Repackaged Brand Name Product', 'text': '04 - Rx/Repackaged Brand Name Product'},
    {'code': 'Rx/Branded Generic', 'text': '05 - Rx/Branded Generic'},
    {'code': 'OTC/Brand Name', 'text': '07 - OTC/Brand Name'},
    {'code': 'OTC/Generic', 'text': '08 - OTC/Generic'},
    {'code': 'OTC/Repackaged', 'text': '09 - OTC/Repackaged'},
    {'code': 'Rx/Repackaged Branded Generic Product', 'text': '10 - Rx/Repackaged Branded Generic Product'},
    {'code': 'Chemical for Compounding', 'text': '11 - Chemical for Compounding'},
    {'code': 'Fee', 'text': 'FE - Fee'},
    {'code': 'Ingredient Cost From Pharmacy', 'text': 'IC - Ingredient Cost From Pharmacy'},
    {'code': 'Kit', 'text': 'KI - Kit'},
    {'code': 'Compound Drug (Formulary)', 'text': 'CF - Compound Drug (Formulary)'},
    {'code': 'Compound Drug (Non-Formulary)', 'text': 'CN - Compound Drug (Non-Formulary)'},
    {'code': 'Drug that uses MAC table for Pricing', 'text': 'MC - Drug that uses MAC table for Pricing'},
    {'code': 'Use Submitted Price From Pharmacy', 'text': 'SB - Use Submitted Price From Pharmacy'}
  ]
  //  const productTypeList = [
  //    "01 - Rx/Brand Name",
  //    "02 - Rx/Generic",
  //    "03 - Surgical/Device",
  //    "04 - Rx/Repackaged Brand Name Product",
  //    "05 - Rx/Branded Generic",
  //    "07 - OTC/Brand Name",
  //    "08 - OTC/Generic",
  //    "09 - OTC/Repackaged",
  //    "10 - Rx/Repackaged Branded Generic Product",
  //    "11 - Chemical for Compounding",
  //    "FE - Fee",
  //    "IC - Ingredient Cost From Pharmacy",
  //    "KI - Kit",
  //    "CF - Compound Drug (Formulary)",
  //    "CN - Compound Drug (Non-Formulary)",
  //    "MC - Drug that uses MAC table for Pricing",
  //    "SB - Use Submitted Price From Pharmacy"
  //  ]
  const deaClassList = [
    "RX",
    "OTC",
    "CI",
    "CII",
    "CIII",
    "CIV",
    "CV"
  ]

  const defaultDetailedInfo = {
    drug_type_cd: 'C',
    group_id: 0,
    ndc: null,
    mfg_name_txt: null,
    single_src_ind: 'Y',
    form_type_cd: 'S',
    maint_drug_ind: 'Y',
    std_uom_cd: 'EA',
    wac_curr_unit_price_amt: '0',
    awp_curr_unit_price_amt: '0',
    dp_curr_unit_price_amt: '0',
    mac_curr_unit_price_amt: '0',
    wac_curr_price_effect_dt: new Date().toLocaleDateString(),
    awp_curr_price_effect_dt: new Date().toLocaleDateString(),
    dp_curr_price_effect_dt: new Date().toLocaleDateString(),
    mac_curr_price_effect_dt: new Date().toLocaleDateString(),
    hcpcsStartDt: new Date().toLocaleDateString(),
    hcpcsEndDt: '9998-12-31'
  }

  export default {
    name: 'drug-detail-form',
    props: ['data', 'type', 'show', 'closeForm', 'saveDrug'],
    components: {
      DatePicker,
      Vodal
    },
    data() {
      return {
        tabs_list: ['Drug Information'],
        drug_type_cd_list: [{
          value: 'S',
          text: 'Special'
        }, {
          text: 'Compound',
          value: 'C'
        }],
        info: {},
        productTypeList: productTypeList,
        dosageList: dosageList,
        deaClassList: deaClassList,
        groupList: [],
        active: '',
        drugFileType: 0,
        detailedInfo: {...defaultDetailedInfo},
        hasEndDate: false,
        useQuantityPricing: false,
        requireQuantityConversation: false,
        isAllGroup: false,
        rules: {
          required: (value) => !!value || value == 0 || 'Required.'
        }
      }
    },
    watch: {
      data: {
        handler: function () {
          if (this.data) {
            this.info = this.data
            this.detailedInfo = Object.assign({}, {...defaultDetailedInfo}, this.data)
            this.setValue()
          }
        },
        deep: true
      },
      show: function (val) {
        if (val && this.type === 'add') {
          this.detailedInfo = {...defaultDetailedInfo}
          this.setValue()
          this.tabs_list = ['Drug Information', 'Compound Information']
          this.isAllGroup = true
        }
      },
    },
    mounted() {
      const data = {
        search: {
          Pcc: store.state.pcn.pcc
        },
        orderBy: 'Name',
        includeProperties: ''
      }

      const that = this
      claimServices.getGroupsList(data).then(function (groups) {
        that.groupList = []
        if (groups.length > 0) {
          groups.forEach(function (d) {
            that.groupList.push({name_txt: d.Code + '-' + d.Name, group_id: d.Id})
          })
        }
        that.groupList.unshift({group_id: 0, name_txt: "All Groups"})
      })
    },
    methods: {
      close: function () {
        this.closeForm()
      },
      setValue: function () {
        const that = this
        if (this.info && this.info.hasOwnProperty('NDC') && this.info['NDC']) {
          const data = {
            "ndc": this.info['NDC']
          }
          drugServices.getDrugDataWthDnc(data).then(function (v) {
            if (v.drug_data.length > 0) {
              const temp = v.drug_data[0]
              that.detailedInfo = Object.assign({},
                {...that.detailedInfo},
                {...temp},
                {
                  awp_curr_price_effect_dt: convertStringToPickerFormat(temp['awp_curr_price_effect_dt']),
                  dp_curr_price_effect_dt: convertStringToPickerFormat(temp['dp_curr_price_effect_dt']),
                  mac_curr_price_effect_dt: convertStringToPickerFormat(temp['mac_curr_price_effect_dt']),
                  wac_curr_price_effect_dt: convertStringToPickerFormat(temp['wac_curr_price_effect_dt'])
                })
            }
          })
        }
      },
      save: function () {
        const newInfo = Object.assign({}, {...this.detailedInfo}, {
          "form_cd": this.detailedInfo['form_cd'] && this.detailedInfo['form_cd'].split('-')[0].trim(),
          "product_type_cd": this.detailedInfo['product_type_cd'] && this.detailedInfo['product_type_cd'].split('-')[0].trim(),
          hcpcsStartDt: stringToDate(this.detailedInfo['awp_curr_price_effect_dt'], 'yyyy-mm-dd', '-', 'date').toLocaleDateString(),
          hcpcsEndDt: stringToDate(this.detailedInfo['awp_curr_price_effect_dt'], 'yyyy-mm-dd', '-', 'date').toLocaleDateString()
        })
        const that = this
        if (this.$refs.form.validate()) {
          drugServices.addDrug(newInfo, this.$store.state.user, this.$store.state.pcn.pcc).then(function (v) {
            if (v && (v[0] === '0' || v[0] === null)) {
              that.selectedDrug = {}
              that.close()
              window.Vue.$emit('snackbar', 'success', 'Added Drug successfully!');
            }
          })
        } else {
          this.active = 'Drug Information'
        }
      },
      changeDrugType: function (value) {
        if (value === 'C') {
          this.tabs_list = ['Drug Information', 'Compound Information']
          this.isAllGroup = true
        } else {
          this.tabs_list = ['Drug Information']
          this.isAllGroup = false
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>
