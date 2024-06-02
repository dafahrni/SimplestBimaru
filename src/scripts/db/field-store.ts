import { FieldBase } from "../models/board/field-base.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { IRepo } from "../models/repos/repo.js";
import { StoreBase } from "./store-base.js";

interface IField {
  text: string;
}

export class FieldStore
  extends StoreBase<FieldBase, IField>
  implements IRepo<FieldBase>
{
  constructor() {
    super("field");
  }

  mapToEntity(field: FieldBase): IField {
    return { text: field.asText() };
  }

  mapFromEntity(field: IField): FieldBase {
    return FieldFactory.parse(field?.text);
  }
}
