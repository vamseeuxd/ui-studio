export declare class UifComponentGroupModel {
  id?: string;
  name: string;
  components?: any[];
  isOpen?: boolean;
  isSubComponents?: boolean;
}

export declare class UifComponentGroupSourceModel {
  data: UifComponentGroupModel[];
  idField: string;
  labelField: string;
}
