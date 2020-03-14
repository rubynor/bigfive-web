import b5 from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'

export const languages = b5.getInfo()
  .languages
  .map(({ id, text }) => ({ value: id, text }))
  .sort((a, b) => a.text.localeCompare(b.text))

export const getItems = b5.getItems

export const getInfo = b5.getInfo()

export const secToMin = seconds => {
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

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const validMongoId = id => /^[0-9a-fA-F]{24}$/.test(id)

export const base64url = str => escape(Buffer.from(str, 'utf8').toString('base64'))

export const formatId = id => /^((http|https):\/\/)/.test(id) ? id.replace((process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://bigfive-test.com') + '/result/', '').replace(' ', '').toLowerCase() : id ? id.replace(' ', '') : id

export const elapsedTimeInSeconds = startTime => Math.round((Date.now() - startTime) / 1000)
