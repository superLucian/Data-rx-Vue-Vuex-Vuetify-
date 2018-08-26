'use strict'
import http from 'superagent'
import xmljson from 'xml-js'

export const baseUrl = 'http://localhost:64126'
// export const baseUrl = ''

export const httpWrapper = {
  // Load the data (XML type)
  LoadXMLData: function (url, data) {
    const that = this
    if(!url.startsWith('http') && !url.startsWith('/'))
      url = `${baseUrl}/${url}`
    return new Promise((resolve, reject) => {
      http.post(url, data).end(
        function (error, response) {
          if (response.status === 200) {
            const content = JSON.parse(response.text)
            const json = that.xmlTojson(content.d)
            resolve(json)
          } else if (response.status === 401) {
            window.Vue.$emit('snackbar', 'error', 'User Not Authorized!')
            reject(response)
          } else if (response.status === 500) {
            window.Vue.$emit('snackbar', 'error', 'Server Error')
            reject(response)
          } else if (response.status === 404) {
            window.Vue.$emit('snackbar', 'error', 'Resource Not Found')
            reject(response)
          } else if (response.status === 405) {
            window.Vue.$emit('snackbar', 'error', 'Method Not Allowed')
            reject(response)
          }
        })
    })
  },

  // Load the data (JSON type)
  LoadJSONData: function (url, data) {
    if(!url.startsWith('http') && !url.startsWith('/'))
      url = `${baseUrl}/${url}`
    return new Promise((resolve, reject) => {
      http.post(url)
      .send(data)
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('accept', 'application/json')
      .withCredentials()
      .redirects(1)
      .on('redirect', (res) => {console.log('redirected' + res)})
      .end(
        function (error, response) {
          if(error) {
            // window.Vue.$emit('snackbar', 'error', `Error: ${error}`)
            reject(error)
          }
          if(!response) {
            if(response != 0 || response != '0'){
              window.Vue.$emit('snackbar', 'error', `Request Error`)
            }
            reject(false)
          }
          if (response.status === 200) {
            const content = JSON.parse(response.text)
            if(content.hasOwnProperty('Error')) {  //0, Error:
              reject(content.Error)
            }
            if(content.hasOwnProperty('ExceptionType')) {
              window.Vue.$emit('snackbar', 'error', content.Message)
              reject(content.Message)
            }
            if(content.hasOwnProperty('d')) {
              const dTemp = content.d
              if(typeof dTemp == 'string' && dTemp.startsWith('Error')){
                window.Vue.$emit('snackbar', 'error', content.d)
                resolve(content.d)
              } else {
                resolve(content.d)
              }
            } else {
              reject(response)
            }
          } else if (response.status === 401) {
            window.Vue.$emit('snackbar', 'error', 'User Not Authorized!')
            reject(response)
          } else if (response.status === 500) {
            const errorMsg = response.body && response.body.hasOwnProperty('Message') && response.body['Message'] || JSON.Stringify(response.body)
            // window.Vue.$emit('snackbar', 'error', `Server Error: ${errorMsg}`)
            reject(response)
          } else if (response.status === 404) {
            window.Vue.$emit('snackbar', 'error', 'Resource Not Found')
            reject(response)
          } else if (response.status === 405) {
            // window.Vue.$emit('snackbar', 'error', `${url} - Method Not Allowed`)
            reject(response)
          }
        })
    })
  },

  LoadLocalXMLData: function (url, data) {
    const that = this
    if(!url.startsWith('http') && !url.startsWith('/'))
      url = `${baseUrl}/${url}`
    return new Promise((resolve, reject) => {
      http.get(url, data).end(
        function (error, response) {
          if (response.status === 200) {
            const content = JSON.parse(response.text)
            const json = that.xmlTojson(content.d)
            resolve(json)
          } else if (response.status === 401) {
            window.Vue.$emit('snackbar', 'error', 'User Not Authorized!')
            reject(response)
          } else if (response.status === 500) {
            window.Vue.$emit('snackbar', 'error', 'Server Error')
            reject(response)
          } else if (response.status === 404) {
            window.Vue.$emit('snackbar', 'error', 'Resource Not Found')
            reject(response)
          } else if (response.status === 405) {
            window.Vue.$emit('snackbar', 'error', 'Method Not Allowed')
            reject(response)
          }
        })
    })
  },

  loadRedemptionData: function (dataUrl) {
    return new Promise((resolve, reject) => {
      http.get(dataUrl).end(
        function (error, response) {
          if (response.status === 200) {
            const json = JSON.parse(response.text)
            resolve(json.d)
          } else if (response.status === 401) {
            window.Vue.$emit('snackbar', 'error', 'User Not Authorized!')
            reject(response)
          } else if (response.status === 500) {
            window.Vue.$emit('snackbar', 'error', 'Server Error')
            reject(response)
          } else if (response.status === 404) {
            window.Vue.$emit('snackbar', 'error', 'Resource Not Found')
            reject(response)
          } else if (response.status === 405) {
            window.Vue.$emit('snackbar', 'error', 'Method Not Allowed')
            reject(response)
          }
        })
    })
  },

  // Convert xml to json function
  xmlTojson: function (xml) {
    const options = {
      compact: true
    }
    return JSON.parse(xmljson.xml2json(xml, options))
  }
}

export const getFullAPIAddress = (subAddr) => {
  return `${baseUrl}/${subAddr}`
}

export const getJSONData = (staticDataAddress, apiDataAddress, requestData) => {
  if (window.localMode) {
    return httpWrapper.loadRedemptionData(staticDataAddress)
  }
  return httpWrapper.LoadJSONData(getFullAPIAddress(apiDataAddress), requestData)
}
