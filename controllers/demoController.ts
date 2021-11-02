import Logger from "../common/logger";
import MongoController from "../database/mongoController";

class BookController {
  public logger: Logger;
  public db: MongoController;

  constructor() {
    this.logger = new Logger();
    this.db = new MongoController();
  }

  public getBooks(): any {
    return Promise.resolve(this.db.getDemos())
      .then((books) => {
        return new Promise((resolve, reject) => {
          resolve(books);
        });
      })
      .catch((error) => {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      });
  }

  public getBook = (name : string) => {
    return Promise.resolve(this.db.getDemo(name))
    .then((books) => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    })
    .catch((error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    });
  }
}

export default BookController;