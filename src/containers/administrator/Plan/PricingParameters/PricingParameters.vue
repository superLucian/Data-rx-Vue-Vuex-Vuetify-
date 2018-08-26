<template>
  <main>
    <v-card-text class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs2></v-flex>
        <v-flex xs8>
          <v-card-text class="px-0 py-0">
            <v-select
              v-bind:items="allNetworks" v-model="selectedNetwork" label="Network" item-value="network_id"
              item-text="network_desc" return-object>
            </v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs2></v-flex>
      </v-layout>
      <v-form ref="form1">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="px-0 py-0">
              <p class="text-xs-left">Brand</p>
              <v-card-text class="px-0 pt-0">
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text class="px-0 py-0">
                <v-layout row wrap>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-select v-bind:items="allBrandPC" v-model="selectedBrandPC" label="Price Code"
                              item-value="price_cd"
                              item-text="price_desc_txt" return-object>
                    </v-select>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="price_discount" label="Price Discount" prefix="$" hint="'Price Discount' is less than 9999.99 !" v-model="brandPCSet.b_price_discount"
                                  type="number" :rules="[rules.required, rules.priceRules]" required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="dispense_fee" label="Dispense Fee" prefix="$" hint="'Dispense Fee' is less than 999.99 !" v-model="brandPCSet.b_dispense_fee"
                                  type="number" :rules="[rules.required, rules.feeRules]" required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="admin_fee" label="Admin Fee" prefix="$" hint="'Admin Fee' is less than 999.99 !" v-model="brandPCSet.b_admin_fee" type="number"
                                  :rules="[rules.required, rules.feeRules]" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="px-0 py-0">
              <p class="text-xs-left">Generic</p>
              <v-card-text class="px-0 pt-0">
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text class="px-0 py-0">
                <v-layout row wrap>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-select v-bind:items="allGenericPC" v-model="selectedGenericPC" label="Price Code"
                              item-value="price_cd" prefix="$" item-text="price_desc_txt" return-object>
                    </v-select>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="price_discount" label="Price Discount" v-model="genericPCSet.g_price_discount"
                                  type="number" prefix="$" hint="'Price Discount' is less than 9999.99 !" :rules="[rules.required, rules.priceRules]" required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="dispense_fee" label="Dispense Fee" v-model="genericPCSet.g_dispense_fee"
                                  type="number" prefix="$" hint="'Dispense Fee' is less than 999.99 !" :rules="[rules.required, rules.feeRules]" required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="pl-3 pr-3">
                    <v-text-field name="admin_fee" label="Admin Fee" v-model="genericPCSet.g_admin_fee" type="number"
                                   prefix="$" hint="'Admin Fee' is less than 999.99 !" :rules="[rules.required, rules.feeRules]" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 class="pr-2 pt-0">
                <v-text-field name="allow_refill" label="Allow Refill When" v-model="allowRefill" type="number" required
                              hint="% Consumed" persistent-hint :counter="5"
                              :rules="[rules.required, rules.consumeRules]" required>
                </v-text-field>
              </v-flex>
              <v-flex xs4 class="pr-1 pl-1">
                <v-text-field name="authorization" label="Authorization Required" v-model="authorization" type="number"
                              :counter="6"  :rules="[rules.required, rules.authRules]" required>
                </v-text-field>
              </v-flex>
              <v-flex xs4 class="pl-2">
                <v-text-field name="max_day" label="Max Days Supply" v-model="maxDay" type="number" :counter="4"
                              :rules="[rules.required, rules.maxDayRules]" required>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
      <v-divider class="mt-2"></v-divider>
      <v-flex xs12>
        <small class="red--text">*indicates required field</small>
      </v-flex>
      <v-card-actions class="px-0">
        <v-btn class="primary" @click.native="addMultiplePlan('T')" :disabled="disableUpdateBtn">Update<i v-if="loading"
                                                                                                          class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="addMultiplePlan('F')" :disabled="disableUpdateBtn">Add/Update<i
          v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
      <v-layout row wrap>
        <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn fab dark color="primary mt-3" small @click.native="add()">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="planParamheadersList"
            v-bind:items="planParamList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            item-key="Plan Param Desc">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="props.expanded = !props.expanded" class="text-xs-center px-0">
                  <v-tooltip top v-if="props.expanded">
                    <v-btn icon slot="activator">
                      <v-icon>expand_less</v-icon>
                    </v-btn>
                    <span>Close</span>
                  </v-tooltip>
                  <v-tooltip top v-else>
                    <v-btn icon slot="activator">
                      <v-icon>expand_more</v-icon>
                    </v-btn>
                    <span>View details</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon @click="edit(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="deleteItem(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-center">{{ props.item['Product Type Code'] }}</td>
                <td class="text-xs-left">{{ props.item['Claim Type'] }}</td>
                <td class="text-xs-left">{{ props.item['Product Type Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Single Source'] }}</td>
                <td class="text-xs-left">{{ props.item['Plan Param Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                <td class="text-xs-left">{{ replaceDateVaule(props.item['Created Dt']) }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap class="px-5">
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Product Type Code :</span> {{ props.item['Product Type Code'] }}</p>
                    <p><span>Claim Type :</span> {{ props.item['Claim Type'] }}</p>
                    <p><span>Product Type Desc :</span> {{ props.item['Product Type Desc'] }}</p>
                    <p><span>Single Source :</span> {{ props.item['Single Source'] }}</p>
                    <p><span>Plan Param Desc :</span> {{ props.item['Plan Param Desc'] }}</p>
                    <p><span>Price Code :</span> {{ props.item['Price Code'] }}</p>
                    <p><span>Price Code Desc :</span> {{ props.item['Price Code Desc'] }}</p>
                    <p><span>Price Discount Pct :</span> {{ props.item['Price Discount Pct'] }}</p>
                    <p><span>Dispensing Fee :</span> {{ props.item['Dispensing Fee'] }}</p>
                    <p><span>Incentive Fee :</span> {{ props.item['Incentive Fee'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Service Fee :</span> {{ props.item['Service Fee'] }}</p>
                    <p><span>Admin Fee :</span> {{ props.item['Admin Fee'] }}</p>
                    <p><span>Other Fee :</span> {{ props.item['Other Fee'] }}</p>
                    <p><span>Prior Authorization Amt :</span> {{ props.item['Prior Authorization Amt'] }}</p>
                    <p><span>Allow Refill Pct :</span> {{ props.item['Allow Refill Pct'] }}</p>
                    <p><span>Max Rx Fill Type Code :</span> {{ props.item['Max Rx Fill Type Code'] }}</p>
                    <p><span>Max Rx Fill Count :</span> {{ props.item['Max Rx Fill Count'] }}</p>
                    <p><span>Max Rx Fill Days Count :</span> {{ props.item['Max Rx Fill Days Count'] }}</p>
                    <p><span>MAC Id :</span> {{ props.item['MAC Id'] }}</p>
                    <p><span>Maintenance Med Max Days Supply EA Count :</span>
                      {{ props.item['Maintenance Med Max Days Supply EA Count'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Maintenance Med Max Days Supply GM Amt :</span>
                      {{ props.item['Maintenance Med Max Days Supply GM Amt'] }}</p>
                    <p><span>Maintenance Med Max Days Supply ML Amt :</span>
                      {{ props.item['Maintenance Med Max Days Supply ML Amt'] }}</p>
                    <p><span>Maintenance Med Max Quantity EA Count :</span>
                      {{ props.item['Maintenance Med Max Quantity EA Count'] }}</p>
                    <p><span>Maintenance Med Max Quantity GM Amt :</span>
                      {{ props.item['Maintenance Med Max Quantity GM Amt'] }}</p>
                    <p><span>Maintenance Med Max Quantity ML Amt :</span>
                      {{ props.item['Maintenance Med Max Quantity ML Amt'] }}</p>
                    <p><span>Acute Med Max Days Supply EA Count :</span>
                      {{ props.item['Acute Med Max Days Supply EA Count'] }}</p>
                    <p><span>Acute Med Max Days Supply GM Amt :</span>
                      {{ props.item['Acute Med Max Days Supply GM Amt'] }}</p>
                    <p><span>Acute Med Max Days Supply ML Amt :</span>
                      {{ props.item['Acute Med Max Days Supply ML Amt'] }}</p>
                    <p><span>Acute Med Max Quantity EA Count :</span> {{ props.item['Acute Med Max Quantity EA Count']
                      }}</p>
                    <p><span>Acute Med Max Quantity GM Amt :</span> {{ props.item['Acute Med Max Quantity GM Amt'] }}
                    </p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Acute Med Max Quantity ML Amt :</span> {{ props.item['Acute Med Max Quantity ML Amt'] }}
                    </p>
                    <p><span>Comments :</span> {{ props.item['Comments'] }}</p>
                    <p><span>Status Code :</span> {{ props.item['Status Code'] }}</p>
                    <p><span>Status :</span> {{ props.item['Status'] }}</p>
                    <p><span>Created By :</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Dt :</span> {{ replaceDateVaule(props.item['Created Dt']) }}</p>
                    <p><span>Updated By :</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Updated Dt :</span> {{ replaceDateVaule(props.item['Updated Dt']) }}</p>
                    <p><span>Claim Type Code :</span> {{ props.item['Claim Type Code'] }}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <!-- Add/Save Dialog -->
    <v-form ref="form">
      <v-layout row>
        <Vodal
          :show="show"
          animation="zoom"
          :closeOnEsc="true"
          :closeButton="true"
          :width="1000"
          :height="600"
          :closeOnClickMask="true">
          <v-toolbar>
            <v-icon class="white--text">fa-archive</v-icon>
            <v-toolbar-title class="white--text">
              <div v-if="updateType === 'new'">Add Plan Price Parameters</div>
              <div v-else="updateType === 'update'">Edit Plan Price Parameters</div>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-tabs v-model="activedTab">
              <v-tabs-bar class="transparent">
                <v-tabs-slider class="active-line"></v-tabs-slider>
                <v-tabs-item
                  v-for="tab in tabs"
                  :key="tab.name"
                  :href="tab.path">
                  {{ tab.name }}
                </v-tabs-item>
              </v-tabs-bar>
            </v-tabs>
          </v-card-text>
          <!-- Parameters tab -->
          <v-container fluid v-if="activedTab=='params'" class="py-0">
            <div style="max-height: 400px; overflow: auto">
              <v-layout row wrap>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-text-field name="plan_id" label="Plan Id" v-model="planId" disabled>
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-text-field name="plan_desc" label="Plan Desc" v-model="planDesc" disabled>
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-text-field name="network" label="Network" v-model="selectedNetwork.network_desc" disabled>
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-select label="Claim Type" v-bind:items="allClaimType" v-model="selectedClaimType"
                            item-value="field_value" item-text="desc_txt" return-object :disabled="disabled">
                  </v-select>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-select label="Product Type" v-bind:items="allProductType" v-model="selectedProductType"
                            item-value="product_type_cd" item-text="product_type_desc_txt" return-object
                            :disabled="disabled">
                  </v-select>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-radio-group row v-model="selectedItem['Single Source']">
                    <v-radio value="Y" label="Single Source" light></v-radio>
                    <v-radio value="N" label="Multi-Source" light></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-text-field name="desc" label="Description" v-model="selectedItem['Plan Param Desc']"
                                :rules="[rules.required]" required>
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-radio-group row v-model="selectedItem['Status Code']">
                    <v-radio value="A" label="Active" light></v-radio>
                    <v-radio value="I" label="Inactive" light></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs3 class="pr-3 pl-3">
                  <v-select v-bind:items="allBrandPC" v-model="selectedPC" label="Price Code" item-value="price_cd"
                            item-text="price_desc_txt" return-object>
                  </v-select>
                </v-flex>
                <v-flex xs3 class="pr-3 pl-3">
                  <v-text-field name="price_discount" label="Price Discount"
                                v-model="selectedItem['Price Discount Pct']" required type="number" :counter="2"
                                :rules="[rules.required, rules.priceDiscountPctRules]" required>
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pr-3 pl-3">
                  <v-select label="MAC Drug List" item-value="mac_drug" item-text="mac_drug_desc" disabled>
                  </v-select>
                </v-flex>
              </v-layout>
            </div>
          </v-container>
          <!-- Feeds / DUR tab -->
          <v-container fluid v-if="activedTab=='fees_dur'">
            <div style="max-height: 400px; overflow: auto">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs2 class="pr-3 pl-3">
                      <v-text-field name="dispense_fee" label="Dispense Fee" v-model="selectedItem['Dispensing Fee']"
                                    type="number" :counter="3" :rules="[rules.required, rules.feeRules]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pr-3 pl-3">
                      <v-text-field name="incentive_fee" label="Incentive Fee" v-model="selectedItem['Incentive Fee']"
                                    type="number" :counter="3" :rules="[rules.required, rules.feeRules]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pr-3 pl-3">
                      <v-text-field name="service_fee" label="Service Fee" v-model="selectedItem['Service Fee']"
                                    type="number"
                                    :counter="3" :rules="[rules.required, rules.feeRules]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pr-3 pl-3">
                      <v-text-field name="admin_fee" label="Admin Fee" v-model="selectedItem['Admin Fee']" type="number"
                                    :counter="3" :rules="[rules.required, rules.feeRules]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pr-3 pl-3">
                      <v-text-field name="other_fee" label="Other Fee" v-model="selectedItem['Other Fee']" type="number"
                                    :counter="3" :rules="[rules.required, rules.feeRules]">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs6 class="pr-3 pl-3">
                      <v-text-field name="allow_refill" label="Allow Refill When"
                                    v-model="selectedItem['Allow Refill Pct']"
                                    type="number" :counter="3" :rules="[rules.required, rules.feeRules]"
                                    hint="% Consumed"
                                    persistent-hint>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pr-3 pl-3">
                      <v-text-field name="authorization" label="Authorization Required for"
                                    v-model="selectedItem['Prior Authorization Amt']" type="number" :counter="6"
                                    :rules="[rules.required, rules.authRules]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pr-3 pl-3">
                      <v-select v-bind:items="allMaxRxFillType" v-model="selectedMaxRxFillType" label="Max Rx Fill Type"
                                item-value="max_rx_fill_type_cd" item-text="max_rx_fill_type_desc_txt" return-object
                                required>
                      </v-select>
                    </v-flex>
                    <v-flex xs3 class="pr-3 pl-3">
                      <v-text-field name="fill_count" label="Fill Count" v-model="selectedItem['Max Rx Fill Count']"
                                    type="number" disabled>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs3 class="pr-3 pl-3">
                      <v-text-field name="fill_days" label="Fill Days" v-model="selectedItem['Max Rx Fill Days Count']"
                                    type="number" disabled>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs4></v-flex>
                    <v-flex xs4>
                      <v-subheader>Maintenace Medications</v-subheader>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader>Acute Medications</v-subheader>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Days Supply - EA</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_ea_mm"
                                      v-model="selectedItem['Maintenance Med Max Days Supply EA Count']" type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_ea_am"
                                      v-model="selectedItem['Acute Med Max Days Supply EA Count']"
                                      type="number"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Days Supply - GM</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_gm_mm"
                                      v-model="selectedItem['Maintenance Med Max Days Supply GM Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_gm_am" v-model="selectedItem['Acute Med Max Days Supply GM Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Days Supply - ML</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_ml_mm"
                                      v-model="selectedItem['Maintenance Med Max Days Supply ML Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_supply_ml_am" v-model="selectedItem['Acute Med Max Days Supply ML Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs4></v-flex>
                    <v-flex xs4>
                      <v-subheader>Maintenace Medications</v-subheader>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader>Acute Medications</v-subheader>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Qty - EA</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_ea_mm"
                                      v-model="selectedItem['Maintenance Med Max Quantity EA Count']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_ea_am" v-model="selectedItem['Acute Med Max Quantity EA Count']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Qty - GM</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_gm_mm" v-model="selectedItem['Maintenance Med Max Quantity GM Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_gm_am" v-model="selectedItem['Acute Med Max Quantity GM Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-card-text class="px-0">
                        <v-subheader>Max Qty - ML</v-subheader>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_ml_mm" v-model="selectedItem['Maintenance Med Max Quantity ML Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-text class="py-0">
                        <v-text-field name="max_qty_ml_am" v-model="selectedItem['Acute Med Max Quantity ML Amt']"
                                      type="number">
                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
          </v-container>
          <!-- Comments tab -->
          <v-container fluid v-if="activedTab=='comments'">
            <div style="max-height: 200px; overflow: auto">
              <v-layout row wrap>
                <v-flex xs12 class="pr-3 pl-3">
                  <v-text-field name="comments" multi-line v-model="selectedItem['Comments']"
                                label="Please Enter Comments Here">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-divider></v-divider>
              <v-card-text class="text-xs-center px-0 py-0">
                <v-btn class="primary" :disabled="isDisabledSave" @click.native="save()">Save<i v-if="loading"
                                                                                                class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                </v-btn>
                <v-btn @click.native="close()">Close</v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>
        </Vodal>
      </v-layout>
    </v-form>
  </main>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    data() {
      return {
        planId: '',
        planDesc: '',
        planParamheaders: [],
        planParamList: [],
        allBrandPC: [],
        selectedBrandPC: {},
        allGenericPC: [],
        selectedGenericPC: {},
        allNetworks: [],
        selectedNetwork: {},
        allProductType: [],
        selectedProductType: {},
        allMaxRxFillType: [],
        selectedMaxRxFillType: {},
        allClaimType: [],
        selectedClaimType: {},
        brandPCSet: {b_price_code: '', b_price_discount: '', b_dispense_fee: '', b_admin_fee: ''},
        genericPCSet: {g_price_code: '', g_price_discount: '', g_dispense_fee: '', g_admin_fee: ''},
        allowRefill: '',
        authorization: '',
        maxDay: '',
        disableUpdateBtn: true,
        originalProductSrcType: '',
        selectedPC: {},
        selectedItem: {},
        isDisabledSave: true,
        updateType: 'root',
        search: '',
        loading: false,
        show: false,
        disabled: false,
        tabs: [
          {name: 'Parameters', path: 'params', validated: false},
          {name: 'Fees / DUR', path: 'fees_dur', validated: false},
          {name: 'Comments', path: 'comments'}],
        activedTab: null,
        pagination: {
          rowsPerPage: 10
        },
        planParamheadersList: [
          {text: '', align: 'center', sortable: false, value: ''},
          {text: '', align: 'center', sortable: false, value: ''},
          {text: 'Product Type Code', align: 'left', sortable: true, value: 'Product Type Code'},
          {text: 'Claim Type', align: 'left', sortable: true, value: 'Claim Type'},
          {text: 'Product Type Desc', align: 'left', sortable: true, value: 'Product Type Desc'},
          {text: 'Single Source', align: 'left', sortable: true, value: 'Single Source'},
          {text: 'Plan Param Desc', align: 'left', sortable: true, value: 'Plan Param Desc'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Dt', align: 'left', sortable: true, value: 'Created Dt'},
        ],
        rules: {
          required: (v) => {
            if (v === "" || v === null) {
              return 'Required.'
            } else {
              return true
            }
          },
          priceRules: (v) => parseFloat(v) < 10000 || 'Price Discount cannot be greater than 9999.90',
          priceDiscountPctRules: (v) => parseFloat(v) < 100 || 'Price Discount Pct cannot be greater than 99.90',
          feeRules: (v) => parseFloat(v) < 1000 || 'Fee cannot be greater than 999.99',
          consumeRules: (v) => parseFloat(v) < 100000 || 'This field Limit must be less more than 99999.9',
          authRules: (v) => parseFloat(v) < 1000000 || 'This field Limit must be less more than 999999.9',
          authRules: (v) => parseFloat(v) < 1000000 || 'This field Limit must be less more than 999999.9',
          maxDayRules: (v) => parseFloat(v) < 10000 || 'This field Limit must be less more than 9999',
        }
      }
    },
    components: {
      DeleteConfirm, Vodal
    },
    watch: {
      selectedItem: {
        handler: function (newVal, oldVal) {
          if (newVal && oldVal && newVal === oldVal) this.isDisabledSave = false
          this.tabs[0].validated = this.selectedItem['Plan Param Desc'].length > 0 && parseFloat(this.selectedItem['Price Discount Pct']) < 100
          this.tabs[1].validated = parseFloat(this.selectedItem['Dispensing Fee']) < 1000 &&
            parseFloat(this.selectedItem['Incentive Fee']) < 1000 &&
            parseFloat(this.selectedItem['Service Fee']) < 1000 &&
            parseFloat(this.selectedItem['Admin Fee']) < 1000 &&
            parseFloat(this.selectedItem['Other Fee']) < 1000 &&
            parseFloat(this.selectedItem['Allow Refill Pct']) < 1000 &&
            parseFloat(this.selectedItem['Prior Authorization Amt']) < 1000000
        },
        deep: true
      },
      selectedNetwork: {
        handler: function (newVal, oldVal) {
          this.getParamPlanList()
        },
        deep: true
      },
      selectedProductType: function (v) {
        if (this.isDisabledSave) this.isDisabledSave = false
      },
      selectedClaimType: function (v) {
        if (this.isDisabledSave) this.isDisabledSave = false
      },
      selectedPC: function (v) {
        if (this.isDisabledSave) this.isDisabledSave = false
      },
      selectedMaxRxFillType: function (v) {
        if (this.isDisabledSave) this.isDisabledSave = false
      },
      brandPCSet: {
        handler: function () {
          this.disableUpdateBtn = false
        },
        deep: true
      },
      selectedBrandPC: function (v) {
        this.disableUpdateBtn = false
      },
      genericPCSet: {
        handler: function () {
          this.disableUpdateBtn = false
        },
        deep: true
      },
      selectedGenericPC: function (v) {
        this.disableUpdateBtn = false
      },
      allowRefill: function (v) {
        this.disableUpdateBtn = false
      },
      authorization: function (v) {
        this.disableUpdateBtn = false
      },
      maxDay: function (v) {
        this.disableUpdateBtn = false
      },

    },
    mounted() {
      this.setPricingParamsData()
      this.getParamPlanList()
    },
    methods: {
      setPricingParamsData: function () {
        const that = this
        const planData = that.$store.state.selectedPlan
        const planSetupData = that.$store.state.planSetupData
        /* Get Plan Basic data */
        that.planId = planData.plan_id
        that.planDesc = planData.plan_desc_txt
        /* Get All Networks and Set current Network */
        const selectedNetworkId = planData.network_id
        if (selectedNetworkId > -1 && planSetupData.network_data.length > 0) {
          that.allNetworks = planSetupData.network_data.map(function (network) {
            return {network_id: network.network_id, network_desc: network.desc_txt}
          })
          /*
          that.selectedNetwork = that.allNetworks.filter(function (network) {
            return network.network_id === selectedNetworkId
          })[0]
          */
          that.selectedNetwork = that.allNetworks[0]
          //that.allNetworks = []
          //that.allNetworks.push(that.selectedNetwork)
        }
        if (selectedNetworkId === 0 && planSetupData.network_data.length > 0) {
          that.selectedNetwork = that.allNetworks[0]
        }
        planServices.getParamSetupData(this.$store.state.selectedPlan.group_id).then(function (res) {
          /* Get All Price Code Types for Brand and Set default value */
          that.allBrandPC = res.price_cd_data
          that.selectedBrandPC = that.allBrandPC[5]
          /* Get All Price Code Types for Gerenic and Set default value */
          that.allGenericPC = res.price_cd_data
          that.selectedGenericPC = that.allGenericPC[5]
          /* Get All Product Types */
          that.allProductType = res.product_type_data
          /* Get All Max Rx Fill Types */
          that.allMaxRxFillType = res.max_rx_fill_type_data
          /* Get All Claim Types */
          that.allClaimType = res.syscode_secondary_claim_cd.map(function (type) {
            return {field_value: type.field_value, desc_txt: type.desc_txt}
          })
          setTimeout(function () {
            that.disableUpdateBtn = true
          }, 200)
        })
      },
      getParamPlanList: function () {
        const that = this
        const networkid = that.selectedNetwork.network_id || 0
        /* Get values needed from ParmPlan and ParamSetupData */
        planServices.getParamPlan(that.$store.state.selectedPlan.group_id, that.$store.state.selectedPlan.plan_id, networkid).then(function (res) {
          that.planParamList = res.plan_param_data
          if (res.plan_param_data.length > 0) {
            that.planParamheaders = Object.keys(that.planParamList[0])
          }
        })
      },
      changeSort: function (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      replaceDateVaule: function (dateStr) {
        if (dateStr) {
          let timestamp = /\(([^}]+)\)/.exec(dateStr)[1]
          let date = new Date(Number(timestamp))
          let yyyy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          return (mm < 10 ? "0" + mm : mm) + "/" + (dd < 0 ? "0" + dd : dd) + "/" + yyyy
        } else {
          return null
        }
      },
      add: function () {
        this.activedTab = 'params'
        this.updateType = 'new'
        this.show = true
        this.disabled = false
        /* Set default values for new item */
        this.selectedProductType = this.allProductType[0]
        this.selectedClaimType = this.allClaimType[0]
        this.selectedPC = this.allBrandPC[0]
        this.selectedMaxRxFillType = this.allMaxRxFillType[0]
        this.selectedItem['Single Source'] = "Y"
        this.selectedItem['Plan Param Desc'] = ""
        this.selectedItem['Price Discount Pct'] = "0"
        this.selectedItem['Dispensing Fee'] = "0"
        this.selectedItem['Incentive Fee'] = "0"
        this.selectedItem['Service Fee'] = "0"
        this.selectedItem['Admin Fee'] = "0"
        this.selectedItem['Other Fee'] = "0"
        this.selectedItem['Prior Authorization Amt'] = "0"
        this.selectedItem['Allow Refill Pct'] = "0"
        this.selectedItem['Max Rx Fill Count'] = "0"
        this.selectedItem['Max Rx Fill Days Count'] = "0"
        this.selectedItem['MAC Id'] = "0"
        this.selectedItem['Maintenance Med Max Days Supply EA Count'] = "0"
        this.selectedItem['Maintenance Med Max Days Supply GM Amt'] = "0"
        this.selectedItem['Maintenance Med Max Days Supply ML Amt'] = "0"
        this.selectedItem['Maintenance Med Max Quantity EA Count'] = "0"
        this.selectedItem['Maintenance Med Max Quantity GM Amt'] = "0"
        this.selectedItem['Maintenance Med Max Quantity ML Amt'] = "0"
        this.selectedItem['Acute Med Max Days Supply EA Count'] = "0"
        this.selectedItem['Acute Med Max Days Supply GM Amt'] = "0"
        this.selectedItem['Acute Med Max Days Supply ML Amt'] = "0"
        this.selectedItem['Acute Med Max Quantity EA Count'] = "0"
        this.selectedItem['Acute Med Max Quantity GM Amt'] = "0"
        this.selectedItem['Acute Med Max Quantity ML Amt'] = "0"
        this.selectedItem['Comments'] = ""
        this.selectedItem['Status Code'] = "A"
        this.selectedItem = {...this.selectedItem}
        const that = this
        setTimeout(function () {
          that.isDisabledSave = true
        }, 200)
      },
      edit: function (item) {
        const that = this
        that.activedTab = 'params'
        that.updateType = 'update'
        that.show = true
        that.disabled = true
        that.selectedItem = {...item}
        /* Get current Product Type of item that has been selected in Pricing Parms Table */
        that.selectedProductType = that.allProductType.filter(function (productType) {
          return productType['product_type_cd'] === that.selectedItem['Product Type Code']
        })[0]
        /* Get current Claim Type */
        that.selectedClaimType = {
          field_value: that.selectedItem['Claim Type Code'].toString(),
          desc_txt: that.selectedItem['Claim Type']
        }
        /* Get current Price Code Type */
        that.selectedPC = {
          price_cd: that.selectedItem['Price Code'],
          price_desc_txt: that.selectedItem['Price Code Desc']
        }
        /* Store origin Product Source Type */
        that.originalProductSrcType = that.selectedItem['Single Source']
        /* Get Max Rx Fill Type */
        that.selectedMaxRxFillType = that.allMaxRxFillType.filter(function (type) {
          return type.max_rx_fill_type_cd === that.selectedItem['Max Rx Fill Type Code']
        })[0]
        setTimeout(function () {
          that.isDisabledSave = true
        }, 200)
      },
      /* Delete function */
      deleteItem: function (item) {
        const that = this
        const info = Object.assign({}, that.$store.state.selectedPlan, item)
        const user = that.$store.state.user
        const pcc = that.$store.state.pcn.pcc
        const networkid = that.selectedNetwork.network_id || 0
        planServices.deletePlanParam(info, user, pcc, networkid).then(function (res) {
          if (res === "0") {
            that.success(res, " Pricing parameter Deleted!")
          } else {
            that.failed(res)
          }
        }).catch(function (res) {
        })
      },
      /* Update and Add function */
      save: function () {
        const that = this
        if (that.validate()) {
          const info = Object.assign({}, that.$store.state.selectedPlan, that.correctParamData({...that.selectedItem}))
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          const networkid = that.selectedNetwork.network_id || 0
          if (that.updateType === 'update') {
            planServices.updatePlanParam(info, user, pcc, networkid).then(function (res) {
              that.loading = true
              if (res === "0") {
                that.loading = false
                that.success(res, "Updated!")
                that.isDisabledSave = true
              } else {
                that.loading = false
                that.failed(res)
                that.isDisabledSave = true
              }
            }).catch(function () {
              that.loading = false
              that.isDisabledSave = true
            })

          } else if (that.updateType === 'new') {
            planServices.addPlanParam(info, user, pcc, networkid).then(function (res) {
              if (res === "0") {
                that.loading = false
                that.success(res, "Added!")
                that.isDisabledSave = true
              } else {
                that.loading = false
                that.failed(res)
                that.isDisabledSave = true
              }
            }).catch(function (res) {
              that.loading = false
              that.isDisabledSave = true
            })
          }
        }
      },
      validate() {
        const that = this
        let tabForValidation = that.tabs.filter(function (tab) {
          return tab.hasOwnProperty('validated') && !tab['validated']
        })[0]
        if (tabForValidation) {
          that.activedTab = tabForValidation['path']
          setTimeout(function () {
            that.$refs.form.validate()
          }, 200)
          return false
        }
        return true
      },
      /* Add any missing pricing parameters and update existing parameters */
      addMultiplePlan: function (updateFlag) {
        const that = this
        if (updateFlag === 'T') {
          const data = {
            allowRefill: that.allowRefill || -1,
            authReqAmt: that.authorization || -1,
            maxDaysSupply: that.maxDay || -1
          }
          that.brandPCSet.b_price_code = that.selectedBrandPC.price_cd || 0
          that.genericPCSet.g_price_code = that.selectedGenericPC.price_cd || 0
          const info = Object.assign({}, that.$store.state.selectedPlan, that.brandPCSet, that.genericPCSet, data, {update_flag: updateFlag})
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          const networkid = that.selectedNetwork.network_id || 0
          planServices.addPlanParams(info, user, pcc, networkid).then(function (res) {
            that.loading = true
            if (res === "0") {
              that.loading = false
              that.selectedBrandPC = that.allBrandPC[5]
              that.selectedGenericPC = that.allGenericPC[5]
              that.getParamPlanList()
              that.success(res, "Added!")
            } else {
              that.loading = false
            }
          }).catch(function (res) {
            that.loading = false
          })
        } else if (updateFlag === 'F') {
          if (that.$refs.form1.validate()) {
            const data = {allowRefill: that.allowRefill, authReqAmt: that.authorization, maxDaysSupply: that.maxDay}
            that.brandPCSet.b_price_code = that.selectedBrandPC.price_cd
            that.genericPCSet.g_price_code = that.selectedGenericPC.price_cd
            const info = Object.assign({}, that.$store.state.selectedPlan, that.brandPCSet, that.genericPCSet, data, {update_flag: updateFlag})
            const user = that.$store.state.user
            const pcc = that.$store.state.pcn.pcc
            const networkid = that.selectedNetwork.network_id || 0
            planServices.addPlanParams(info, user, pcc, networkid).then(function (res) {
              that.loading = true
              if (res === "0") {
                that.loading = false
                that.selectedBrandPC = that.allBrandPC[5]
                that.selectedGenericPC = that.allGenericPC[5]
                that.getParamPlanList()
                that.success(res, "Added!")
              } else {
                that.loading = false
              }
            }).catch(function (res) {
              that.loading = false
            })
          }
        }
      },
      correctParamData: function (param) {
        param['Product Type Code'] = this.selectedProductType['product_type_cd']
        param['Product Type Desc'] = this.selectedProductType['product_type_desc_txt']
        param['Claim Type'] = this.selectedClaimType.desc_txt
        param['Claim Type Code'] = parseInt(this.selectedClaimType.field_value)
        param['Price Code'] = this.selectedPC.price_cd
        param['Price Code Desc'] = this.selectedPC.price_desc_txt
        param['Max Rx Fill Type Code'] = this.selectedMaxRxFillType.max_rx_fill_type_cd
        param.originalProductSrcType = this.originalProductSrcType
        return param
      },
      success: function (response, msg) {
        this.show = false
        this.getParamPlanList()
        window.Vue.$emit('snackbar', 'success', msg)
      },
      failed: function (response) {
        window.Vue.$emit('snackbar', 'warning', response)
      },
      close: function () {
        this.show = false
        this.isDisabledSave = true
        this.updateType = 'root'
      },
    }
  }
</script>
<style lang="stylus">
</style>
