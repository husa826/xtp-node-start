function isNull(v: any): boolean {
  return v === undefined || v === null;
}

function cast(caster: (v: any) => any, v: any): any {
  if (isNull(v)) return v;
  return caster(v);
}

function castArray(caster: (v: any) => any) {
  return (v?: Array<any>) => {
    if (isNull(v)) return v;
    caster = cast.bind(null, caster); // bind to null-preserving logic in `cast`
    return v!.map(caster);
  };
}

function castMap(caster: (v: any) => any) {
  return (v?: any) => {
    if (isNull(v)) return v;

    caster = cast.bind(null, caster); // bind to null-preserving logic in `cast`
    const newMap: any = {};
    for (const k in v) {
      newMap[k] = caster(v![k]);
    }
    return newMap;
  };
}

function dateToJson(v?: Date): string | undefined | null {
  if (v === undefined || v === null) return v;
  return v.toISOString();
}
function dateFromJson(v?: string): Date | undefined | null {
  if (v === undefined || v === null) return v;
  return new Date(v);
}

function bufferToJson(v?: ArrayBuffer): string | undefined | null {
  if (v === undefined || v === null) return v;
  return Host.arrayBufferToBase64(v);
}
function bufferFromJson(v?: string): ArrayBuffer | undefined | null {
  if (v === undefined || v === null) return v;
  return Host.base64ToArrayBuffer(v);
}

/**
 * A message from the system
 */
export class Message {
  /**
   * The message body. Depends on the type
   */
  body?: string;

  /**
   * The nickname of the originator of the message
   */
  nick?: string | null;

  type?: MessageType;

  static fromJson(obj: any): Message {
    return {
      ...obj,
    };
  }

  static toJson(obj: Message): any {
    return {
      ...obj,
    };
  }
}

/**
 * Tells the application how to interpret this message.
 */
export enum MessageType {
  Html = "html",
  Text = "text",
  Image = "image",
}
