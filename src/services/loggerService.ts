import { Logger } from "../models/loggerModel";

class LoggerService {
  async log(err: Error) {
    await Logger.create({
      data: {
        message: err.message,
        errorStack: err.stack || '',
      },
    });
  }
}

const loggerService = new LoggerService();
export default loggerService;