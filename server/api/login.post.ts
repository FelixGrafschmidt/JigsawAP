import client from '~~/server/apClient'

export default defineEventHandler(async (event) => {
  const { hostport, playername, password, gamename } = await readBody(event)
  client.login(hostport, playername, gamename, { password })
})
