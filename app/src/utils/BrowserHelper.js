const puppeteer = require('puppeteer')
const {
 LEGENDAS_URL,
 LEGENDAS_USERNAME,
 LEGENDAS_PASSWORD
} = process.env

class BrowserHelper {
  browser
  page

  constructor (htmlHelper) {
    this.htmlHelper = htmlHelper
  }

  async search(subtitleSearch, countPage) {
    await this.initPup()
    await this.navigate('/login')
    await this.fillValue('#UserLoginForm #UserUsername', LEGENDAS_USERNAME)
    await this.fillValue('#UserLoginForm #UserPassword', LEGENDAS_PASSWORD)
    await this.click('#UserLoginForm button[type="submit"]')

    //  Search for terms
    await this.navigate(`/busca/${subtitleSearch}`)
    
    await this.page.waitForSelector('#resultado_busca', { timeout: 2000 })
    
    //  Paginate until
    if (await this.hasPaginate(countPage)) {
      await this.doPagination(countPage)
    }
    const results = await this.page.evaluate(this.htmlHelper.transformHTMLToList, '')
    await this.page.close()
    await this.browser.close()
    return results
  }

  async initPup () {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    this.page = await this.browser.newPage()
  }

  async navigate(path) {
    await this.page.goto(`${LEGENDAS_URL}${path}`)
  }

  async fillValue (selector, valueField) { 
    await this.page.waitForSelector(selector, { timeout: 1000})
    await this.page.$eval(selector, (input, value) => input.value = value, valueField)
  }

  async click (selector) {
    await this.page.click(selector)
  }

  async hasPaginate (countPage) {
    if (countPage > 1) {
      await this.page.waitFor(2000)
      const dom = await this.page.$$('#resultado_busca a.load_more')
      return !!dom
    }
  }

  async doPagination(pageCount) {
    let count = 1
    await this.page.waitForSelector('#resultado_busca a.load_more', { timeout: 10000 })
    while(count <= pageCount) {
      await this.page.waitFor(2000)
      await this.page.click('#resultado_busca a.load_more')
      count++
    }
  }
}

module.exports = BrowserHelper
