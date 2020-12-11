import { RefAllItemsMap } from "@/api/types"
import { RefValueMapping, ValueMappings } from "@/api/valueMappings"


export function createToRefItemMap<T>(valueMappings: ValueMappings) {
    return (item: { [key: string]: any }, refAllItemsMap: RefAllItemsMap) => 
        Object.fromEntries(Object.entries(refAllItemsMap).map(([key, itemsGeneric]) => {
            const items = itemsGeneric as unknown as T[]
            const valueMapping = valueMappings[key] as RefValueMapping<T>
            const refId = item[key] as string
            const refItem = items.find(item =>
                valueMapping.idFn(item) === refId
            )
            if (refItem === undefined) {
                console.error(items)
                throw Error(`No item found for refId \"${refId}\"`)
            }
            return [key, refItem]
        })
    )
}
