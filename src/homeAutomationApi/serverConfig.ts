import { ref, watch } from "vue"


const SERVER_CONFIG_KEY = "serverConfig"

export interface ServerConfig {
  baseUrl: URL,
  credentials: {
    username: string,
    password: string
  } | null
}

export const defaultServerConfig = () => ({
  baseUrl: new URL("https://soa1.home.ubipo.net:41543/"),
  credentials: null
} as ServerConfig)

function parseServerConfig(sServerConfig: any): ServerConfig {
  const { baseUrl: sBaseUrl, credentials } = sServerConfig
  const baseUrl = new URL(sBaseUrl)
  return { baseUrl, credentials }
}

const localStorageStr = localStorage.getItem(SERVER_CONFIG_KEY)

export const serverConfig = ref(
  localStorageStr !== null
  ? parseServerConfig(JSON.parse(localStorageStr))
  : defaultServerConfig()
)

watch(serverConfig, () =>
  localStorage.setItem(SERVER_CONFIG_KEY, JSON.stringify(serverConfig.value))
)

