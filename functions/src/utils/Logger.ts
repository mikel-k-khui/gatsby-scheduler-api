export class Logger {
  log(uuid: string, caller: string, message?: string): void {
    console.log('ERROR :: ', caller, ' :: ', uuid, ' :: ', message)
  }

  error(uuid: string, caller: string, message?: string): void {
    console.error('ERROR :: ', caller, ' :: ', uuid, ' :: ', message)
  }
}
