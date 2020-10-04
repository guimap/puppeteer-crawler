class HTMLHelper {
  constructor() {

  }

  async transformHTMLToList () {
    const list = []
    const results = document.querySelectorAll('#resultado_busca article > div')
    
    for (const result of results) {
      const name = result.querySelector('.f_left p > a').innerHTML
      const link = result.querySelector('.f_left p > a').href
      const subtitleInfo = result.querySelector('.f_left p.data').innerHTML
      const language = result.querySelector('img').alt
      const [downloadString, rateString, authorAndDateString] = subtitleInfo.split(', ')
      list.push({
        link,
        name,
        downloads: downloadString,
        rate: rateString,
        authorAndDate: authorAndDateString,
        language
      })
    }
  
    return list
  }
  
  sanitizeData (list) {
    if (!Array.isArray) throw new Error('should be an array')
    return list.map(this._sanitizeResult.bind(this))
  }
  _sanitizeResult (result) {
    const rgxId = /(?<=\/download\/)(.*?)(?=\/)/gm
    const id = result.link.match(rgxId)[0]

    const {author, date} = this.getAuthorAndDate(result.authorAndDate)
    return {
      id: id,
      name: result.name,
      downloads: this.getNumber(result.downloads),
      rate: this.getNumber(result.rate),
      author,
      date,
      language: result.language
  
    }
  }
  
  getAuthorAndDate (authorAndDate) {
    const [author, dateString] = authorAndDate.split('em')
  
    const rgxAuthor = new RegExp('(?<=\>)(.*?)(?=\<)')
    const rgxDate = /(\d{2})\/(\d{2})\/(\d{4})/g
  
    const [date, time] = dateString.split('-')
    const dateFormatted = date.replace(rgxDate, '$3-$2-$1')
  
    return {
      author: author.match(rgxAuthor)[0],
      date: new Date(`${dateFormatted.trim()}T${time.trim()}:00`)
    }
  }


  getNumber (string) {
    if (!string) return string
    const rgxNumber = new RegExp('\\d+')
    return parseFloat(string.match(rgxNumber)[0])
  }

}

module.exports = HTMLHelper