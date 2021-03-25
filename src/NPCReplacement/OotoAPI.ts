import { Age } from 'modloader64_api/OOT/OOTAPI';

export enum OotOnlineEvents {
  ALLOCATE_MODEL_BLOCK = "OotOnline:AllocateModelBlock"
}

export class OotOnline_ModelAllocation {
  model: Buffer;
  age: Age;
  slot!: number;
  pointer!: number;
  rom!: number;

  constructor(model: Buffer, age: Age) {
    this.model = model;
    this.age = age;
  }
}