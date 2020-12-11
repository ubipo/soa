export function filterObj<V>(
  obj: { [key: string]: V },
  predicate: (key: string, value: V) => boolean
) {
  return Object.fromEntries(Object.entries(obj).filter(
    ([key, value]) => predicate(key, value)
  ))
}

export function joinPathSegments(...segments: string[]) {
  return segments.map(segment => segment.slice(
    segment.startsWith("/") ? 1 : 0,
    segment.endsWith("/") ? -1 : undefined
  )).join("/") + "/"
}

export function httpBasicAuthorizationHeader(
  username: string, password: string
) {
  const encoded = Buffer.from(`${username}:${password}`).toString('base64')
  return `Basic ${encoded}`
}
