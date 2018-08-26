export default class BasePbmsys {
  constructor(host = '', name) { //class constructor

    this.url = `${host}/Pbmsys/${name}.asmx`
  }

  get addUrl() {
    return this.url + '/Add'
  }

  get updateUrl() {
    return this.url + '/Update'
  }

  get getUrl() {
    return this.url + '/Get'
  }

  get getByIdUrl() {
    return this.url + '/GetById'
  }

  get getByKeyUrl() {
    return this.url + '/GetByKey'
  }

  get DeleteUrl() {
    return this.url + '/Delete'
  }


  get GetOrUrl() {
    return this.url + '/GetOr'
  }

  get GetPageUrl() {
    return this.url + '/GetPage'
  }

  get GetPageOrUrl() {
    return this.url + '/GetPageOr'
  }


  get CountUrl() {
    return this.url + '/Count'
  }


  add() {}

  update() {}

  get() {}

  getById() {}

  Delete() {}

  GetOr() {}

  GetPage() {}

  GetPageOr() { }

  Count() { }

}
