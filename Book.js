const { v4: uuid } = require('uuid');

class Book {
  constructor(book) {
    this.id = uuid();
    this.title = book?.title || '';
    this.description = book?.description || '';
    this.authors = book?.authors || '';
    this.favorite = book?.favorite || '';
    this.fileCover = book?.fileCover || '';
    this.fileName = book?.fileName || '';
    this.fileBook = book?.fileBook || '';
  }
}

module.exports = {
  Book,
};
