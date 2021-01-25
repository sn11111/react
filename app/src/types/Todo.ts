export interface TodoTypes {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
}

export type ApiDataType = {
  message: string;
  status: string;
  todos: TodoTypes[];
  todo?: TodoTypes;
};
