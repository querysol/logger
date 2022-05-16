import RNFS from 'react-native-fs';

export class NGLogger {
  private static _instance: NGLogger;
  private _filePath: string;
  public static isShaken: boolean;

  private constructor() {
    this._filePath = '';
    if (!NGLogger._instance) {
      NGLogger._instance = this;
    }

    return NGLogger._instance;
  }
  public static getInstance(): NGLogger {
    if (!NGLogger._instance) {
      NGLogger._instance = new NGLogger();
      NGLogger._instance.init();
    }

    return NGLogger._instance;
  }

  private init(): void {
    console.group('NGlogger', 'Initializing...');

    this._filePath = RNFS.DocumentDirectoryPath + '/log.txt';

    this.hijackConsoleLog();

    console.groupEnd();
  }

  public getLogPath(): string {
    return this._filePath;
  }

  public deleteLogFile(): void {
    RNFS.unlink(this.getLogPath());
  }

  public async log(message: any): Promise<void> {
    const path = this.getLogPath();
    let fileContent = '';

    if (await RNFS.exists(path)) {
      fileContent = await this.readLog();
    }
    const date = new Date().toLocaleString('he');

    const formattedMessage = `${date}: ${message}`;

    fileContent = fileContent
      ? fileContent + '\r\n' + formattedMessage
      : formattedMessage;

    return RNFS.writeFile(path, fileContent, 'utf8').catch((err) => {
      console.error(err.message);
    });
  }

  hijackConsoleLog(): void {
    console.log('Hijacking console.log');

    (function () {
      const oldLog = console.log;
      console.log = async function (message) {
        oldLog(message);
        await NGLogger.getInstance().log(message);
      };
    })();
  }

  async readLog(): Promise<string> {
    return await RNFS.readFile(this.getLogPath(), 'utf8');
  }

  removelog(): void {
    RNFS.unlink(this.getLogPath());
  }

  public static showLoggerModal(): boolean {
    return true;
  }
}
