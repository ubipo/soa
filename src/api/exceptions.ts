import { Exception } from "@/exception"


export class NoSuchElementException extends Exception {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, NoSuchElementException.prototype)
    this.name = "NoSuchElementException"
  }
}

export class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, UnauthorizedException.prototype)
    this.name = "UnauthorizedException"
  }
}
