import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export class todoSchema {
  readonly _id: ObjectId;

  @Property({ required: true })
  name: string;

  @Property({ required: true })
  description: string;

  @Property({ required: true })
  status: boolean;
}

export const TodoModel = getModelForClass(todoSchema);
