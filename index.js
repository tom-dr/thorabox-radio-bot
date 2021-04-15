'use strict'

const Discord = require('discord.js')

// constantes
const config = require('./config.js')
const client = new Discord.Client()

// global
let dispatcher = null

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', (message) => {
  if (message.author.bot) {
    return
  }
  if (message.content.startsWith(config.PREFIX)) {
    const args = message.content.slice(config.PREFIX.length + 1).split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
      case 'play':
        if (dispatcher === null) {
          const voiceChannel = message.member.voice.channel

          voiceChannel
            .join()
            .then((connection) => {
              // const stream = YoutubeStream(url)
              dispatcher = connection.play(config.STREAM_URL)
              // dispatcher.setVolume(0.1)
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          dispatcher.resume()
        }
        message.channel.send(createPost('play'))
        break

      case 'pause':
        if (dispatcher !== null) {
          dispatcher.pause()
        }
        message.channel.send(createPost('pause'))
        break

      case 'resume':
        if (dispatcher !== null) {
          dispatcher.resume()
        }
        message.channel.send(createPost('resume'))
        break

      case 'stop':
        if (dispatcher !== null) {
          dispatcher.destroy()
          dispatcher = null
        }
        message.member.voice.channel.leave()
        message.channel.send(createPost('stop'))
        break

      case 'volume':
        let volume = parseInt(args.shift())

        volume = Number.isInteger(volume) ? volume : 100
        if (dispatcher) {
          dispatcher.setVolume(volume / 100)
        }
        message.channel.send(createPost(`volume: ${volume}%`))
        break

      case 'invitation':
        message.channel.send(config.INVITE_LINK)
        break

      default:
        message.channel.send(
          createPost(`${config.BOT_NAME} ${config.BOT_VERSION}`)
        )
        break
    }
  }
})

client.login(config.BOT_TOKEN)

function createPost(text) {
  return {
    embed: {
      color: config.POST_COLORS.DEFAULT,
      title: text
    }
  }
}
