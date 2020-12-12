import { AllItemsGetter, DefaultItemFn, ItemCreator, ItemDeletor, ItemEditor, ItemGetter, ToPartialFn } from "./types";
import { ValueMappings } from "./valueMappings"

export default interface TypeInfo<T, O, P> {
  name: String,
  namePlural: String,
  urlSafePlural: String,
  getItemFn: ItemGetter<T>,
  getItemsFn: AllItemsGetter<T>,
  createItemFn: ItemCreator<T, O>,
  editFn: ItemEditor<T, P>,
  deleteFn: ItemDeletor,
  defaultItemFn: DefaultItemFn<O>,
  valueMappings: ValueMappings,
  relativeLinkFn: (item: T) => string,
  idFn: (item: T) => string,
  nameFn: (item: T) => string
  toPartialFn: ToPartialFn<T, P>,
}
