import { ResponseModel } from "./models/response.model";

export class Utils {

  constructor() { }

  generateToken(size: number) {
    return Array(size).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
  }

  response(description: any, response: any, error: boolean) {
    const responseModel = new ResponseModel();
    responseModel.date = new Date().toDateString();
    responseModel.description = description
    responseModel.response = response
    if (error === true) {
      responseModel.message = 'error'
      console.log(responseModel)
    }
    return responseModel;
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}

