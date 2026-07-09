export interface Events {
  hello: { message: string }
  notification: { type: string; payload: any }
}

export type EventName = keyof Events