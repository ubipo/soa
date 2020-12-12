import { ServerConfig } from "@/homeAutomationApi/serverConfig"

export interface GenericItem {
    [key: string]: string | boolean | null | number // number is also the type for Enums
}

export type ItemGetter<T> = (serverConfig: ServerConfig, id: string) => Promise<T>
export type AllItemsGetter<T> = (serverConfig: ServerConfig) => Promise<T[]>
export type ItemCreator<T, O> = (serverConfig: ServerConfig, outDto: O) => Promise<T>
export type ItemEditor<T, P> = (serverConfig: ServerConfig, id: string, partial: P) => Promise<T>
export type ItemDeletor = (serverConfig: ServerConfig, id: string) => Promise<void>
export type DefaultItemFn<T> = (refAllItemsMap: RefAllItemsMap) => T
export type ToPartialFn<T, P> = (item: T) => P

export interface RefAllItemsMap {
    [key: string]: GenericItem[],
}

export interface RefItemMap {
    [key: string]: GenericItem,
}
