import { Document } from 'mongoose';

interface Browser {
  readonly name: string;
  readonly version: string;
  readonly major: string;
}

interface Engine {
  readonly name: string;
  readonly version: string;
}

interface OS {
  readonly name: string;
  readonly version: string;
}

interface Device {
  readonly vendor: string;
  readonly model: string;
  readonly type: string;
}

interface CPU {
  readonly architecture: string;
}

export interface IViewCard extends Document {
  readonly cardId: string;
  readonly ua: string;
  readonly browser: Browser;
  readonly engine: Engine;
  readonly os: OS;
  readonly device: Device;
  readonly cpu: CPU;
}
