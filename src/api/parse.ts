import DeserializationException from "./deserializationException"


export function createListParser<T>(name: string, parser: (s: any) => T) {
    return function parseList(sItems: any) {
        if (!Array.isArray(sItems)) {
            throw new DeserializationException(`${name} must be a list`)
        }
        return sItems.map(parser)
    }
}
