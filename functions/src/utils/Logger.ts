class LoggerClass {
  public log(uuid: string, message: string, caller?: string): void {
    console.log('LOG :: ', uuid, ' :: ', message, ' :: ', caller)
  }

  public error(uuid: string, message: string, caller?: string): void {
    console.error('ERROR :: ', uuid, ' :: ', message, ' :: ', caller)
  }

  public trace(uuid: string, message: string): void {
    console.trace('TRACE :: ', uuid, ' :: ', message)
  }
}

export const Logger = new LoggerClass()
