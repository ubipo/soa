import { Exception } from "@/exception";
import { ServerConfig } from "@/homeAutomationApi/serverConfig";
import { httpBasicAuthorizationHeader, joinPathSegments } from "@/util";
import { NoSuchElementException, UnauthorizedException } from "./exceptions";


export function createRequest(
  serverConfig: ServerConfig, path: string,
  body: string | object | undefined = undefined, method: string = 'GET'
) {
  const creds = serverConfig.credentials
  const authorizationHeader: Record<string, string> = creds !== null ? {
    "Authorization": httpBasicAuthorizationHeader(
      creds.username,
      creds.password
    )
  } : { }
  const contentTypeHeader: Record<string, string> = typeof body === 'object' ? {
    "Content-Type": "application/json"
  } : { }
  const stringBody = typeof body === 'object' ? JSON.stringify(body) : body
  return new Request(
    joinPathSegments(serverConfig.baseUrl.href, path),
    {
      body: stringBody,
      method,
      headers: new Headers({
        ...authorizationHeader,
        ...contentTypeHeader
      })
    }
  )
}

export function createGetListFn<T>(name: string, path: string, parser: (s: any) => T) {
  return async function(serverConfig: ServerConfig) {
    const res = await fetch(createRequest(serverConfig, path))
    if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (res.status != 200) {
      const resText = await res.text()
      throw new Exception(`HTTP error getting ${name}: ${res.statusText}: ${resText}`)
    }
    const json = await res.json()
    return parser(json)
  }
}

export function createGetShortenedListFn<T, S>(
  name: string, path: string, shortenedItemsListParser: (s: any) => T[],
  idFn: (item: T) => string, getFn: (serverConfig: ServerConfig, id: string) => Promise<S>
) {
  return async function(serverConfig: ServerConfig) {
    const res = await fetch(createRequest(serverConfig, path))
    if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (res.status != 200) {
      const resText = await res.text()
      throw new Exception(`HTTP error getting ${name}: ${res.statusText}: ${resText}`)
    }
    const json = await res.json()
    const shortenedItemsList = shortenedItemsListParser(json)
    const itemsList = await Promise.all(shortenedItemsList.map(shortenedItem => 
      getFn(serverConfig, idFn(shortenedItem))
    ))
    return itemsList
  }
}

export function createGetFn<T>(name: string, path: string, parser: (s: any) => T) {
  return async function(serverConfig: ServerConfig, id: string) {
    const res = await fetch(createRequest(
      serverConfig, joinPathSegments(path, id)
    ))
    if (res.status === 404) {
      throw new NoSuchElementException(`${name} with id: ${id}`)
    } else if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (res.status != 200) {
      const resText = await res.text()
      throw new Exception(`HTTP error getting ${name}: ${res.statusText}: ${resText}`)
    }
    const json = await res.json()
    return parser(json)
  }
}

export function createCreateFn<T, S>(
  name: string,
  path: string,
  parser: (s: any) => T,
  serializer: (o: S) => any
) {
  return async function(serverConfig: ServerConfig, outDto: S) {
    const res = await fetch(createRequest(
      serverConfig, path, serializer(outDto), 'POST'
    ))
    if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (![200, 201].includes(res.status)) {
      const resText = await res.text()
      throw new Exception(`HTTP error creating ${name}: ${res.statusText}: ${resText}`)
    }
    const json = await res.json()
    return parser(json)
  }
}

export function createEditFn<T, S>(
  name: string,
  path: string,
  parser: (s: any) => T,
  serializer: (o: S) => any
) {
  return async function(serverConfig: ServerConfig, id: string, partial: S) {
    const res = await fetch(createRequest(
      serverConfig, joinPathSegments(path, id), serializer(partial), 'PUT'
    ))
    if (res.status === 404) {
      throw new NoSuchElementException(`${name} with id: ${id}`)
    } else if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (res.status != 200) {
      const resText = await res.text()
      throw new Exception(`HTTP error editing ${name}: ${res.statusText}: ${resText}`)
    }
    const json = await res.json()
    return parser(json)
  }
}

export function createDeleteFn(
  name: string,
  path: string
) {
  return async function(serverConfig: ServerConfig, id: string) {
    const res = await fetch(createRequest(
      serverConfig, joinPathSegments(path, id), undefined, 'DELETE'
    ))
    if (res.status === 404) {
      throw new NoSuchElementException(`${name} with id: ${id}`)
    } else if (res.status === 401) {
      throw new UnauthorizedException()
    } else if (![200, 202, 204].includes(res.status)) {
      const resText = await res.text()
      throw new Exception(`HTTP error deleting ${name}: ${res.statusText}: ${resText}`)
    }
  }
}
