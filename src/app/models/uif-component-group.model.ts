export declare class UifComponentGroup {
  id?: string;
  name: string;
  components?: any[];
  isOpen?: boolean;
  isSubComponents?: boolean;
}

export declare class UifComponentGroupSource {
  data: UifComponentGroup[];
  idField: string;
  labelField: string;
}
