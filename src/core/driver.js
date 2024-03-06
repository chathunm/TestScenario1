const { Builder } = require('selenium-webdriver')
const propertiesReader = require('properties-reader')
const path = require("path")
const properties = propertiesReader(path.join(__dirname, '../config/config.properties'))
const browser = properties.get('browser')

class SeleniumDriver {
  constructor() {
      this.driver = new Builder()
        .forBrowser(browser)
        .build()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SeleniumDriver()
    }
    return this.instance
  }
}

module.exports.SeleniumDriver = SeleniumDriver