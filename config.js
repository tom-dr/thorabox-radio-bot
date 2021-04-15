const project = require('./package.json')

module.exports = {
  BOT_VERSION: project.version,
  BOT_NAME: 'Torah-Box Radio',
  BOT_TOKEN: '',
  PREFIX: 'tbr',
  STREAM_URL: 'http://radio.torah-box.com:8000/_a',
  INVITE_LINK:
    'https://discord.com/api/oauth2/authorize?client_id=832149084450193458&permissions=0&scope=bot',
  POST_COLORS: {
    DEFAULT: 15844367
  }
}
