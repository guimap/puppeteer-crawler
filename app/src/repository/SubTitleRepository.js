const SubtitleModel = require('../models/SubTitleModel')
class SubTitleRepository {
  constructor() {
    
  }

  async upsert(subtitle) {
    await SubtitleModel.findOneAndUpdate({id: subtitle.id,}, { $set: { ...subtitle } }, {
      upsert: true,
      new: true
    })
  }
}

module.exports = SubTitleRepository
