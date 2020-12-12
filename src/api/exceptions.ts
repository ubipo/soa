import { Exception } from "@/exception"


export class NoSuchElementException extends Exception {
  constructor(message: string) {
    super(message)
    this.name = "NoSuchElementException"
  }
}

export class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super(message)
    this.name = "UnauthorizedException"
  }
}
