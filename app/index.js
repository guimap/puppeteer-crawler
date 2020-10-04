require('dotenv').config()
const app = require('./src/app')

const name = process.argv[2]
const countPage = process.argv[3] || 1
if (!name) throw new Error('Should pass a serie name')


app.run(name, countPage)
.then(console.log)
.then(() => process.exit(0))
.catch((err) => {
  console.error(err)
  process.exit(1)
})
