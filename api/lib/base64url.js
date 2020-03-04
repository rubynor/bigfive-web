const unescape = str => (str + '==='.slice((str.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/')
const escape = str => str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
exports.encode = str => escape(Buffer.from(str, 'utf8').toString('base64'))
exports.decode = str => JSON.parse(Buffer.from(unescape(str), 'base64').toString('utf8'))
