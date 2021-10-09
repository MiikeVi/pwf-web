export type JSONPatchOperation = {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value?: any;
};

export type JSONPatch = Array<JSONPatchOperation>;

export type PatchBody = {
  jsonPatchBody: JSONPatch;
};
