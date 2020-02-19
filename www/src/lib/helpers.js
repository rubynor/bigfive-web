const { getInfo, getItems } = require('@alheimsins/b5-johnson-120-ipip-neo-pi-r')

exports.languages = getInfo()
  .languages
  .map(({ id, text }) => ({ value: id, text }))

exports.getItems = getItems

module.exports.secToMin = seconds => {
  const minuteDivisor = seconds % (60 * 60)
  const minutes = Math.floor(minuteDivisor / 60)
  const secondDivisor = minuteDivisor % 60
  let remSecs = Math.ceil(secondDivisor)

  switch (seconds) {
    case seconds < 10:
      return `0:0${seconds}`
    case seconds < 60:
      return `0:${seconds}`
    default:
      if (remSecs < 10 && remSecs > 0) remSecs = `0${remSecs}`
      if (remSecs === 0) remSecs = `${remSecs}0`
      return `${minutes}:${remSecs}`
  }
}

module.exports.sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
