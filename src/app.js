const HTMLHelper = require('./utils/HTMLHelper')
const BrowserHelper = require('./utils/BrowserHelper')
const mongoose = require('mongoose')
const SubtitleRepository = require('./repository/SubTitleRepository')
const {
  MONGODB_URI,
  MONGODB_NAME,
} = process.env

async function connectDB() {
  console.log('Connecting database')
  console.log(`${MONGODB_URI}/${MONGODB_NAME}`)
  await mongoose.connect(`${MONGODB_URI}/${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  console.log('Connected')
}

async function run (subtitleSearch, pageCount = 1) {
  await connectDB()
  
  const subtitleRepository = new SubtitleRepository()
  const htmlHelper = new HTMLHelper()
  const browserHelper = new BrowserHelper(htmlHelper)

  const listOfResults = await browserHelper.search(subtitleSearch, pageCount)
  const list = htmlHelper.sanitizeData(listOfResults)
  const pendingPromises = list.map(subtitleRepository.upsert)
  await Promise.all(pendingPromises)
  return `Encontramos ${list.length} legendas`
}


module.exports = {
  run
}