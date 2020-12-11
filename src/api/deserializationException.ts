import { Exception } from '@/exception'


export default class DeserializationException extends Exception {
  constructor(message: string) {
    super(message)
    this.name = "DeserializationException"
  }
}
