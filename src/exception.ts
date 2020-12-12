export class Exception extends Error {
  constructor(message?: string) {
    super(message)
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, Exception.prototype)
    this.name = "Exception"
  }
}

export class IllegalArgumentException extends Exception {
  constructor(arg: string, val: string | object, reason: string) {
    super(`<${arg}> ("${val}") ${reason}`)
    Object.setPrototypeOf(this, IllegalArgumentException.prototype)
    this.name = "IllegalArgumentException"
    this.arg = arg
    this.val = String(val)
    this.reason = reason
  }

  readonly arg: string
  readonly val: string
  readonly reason: string
}
