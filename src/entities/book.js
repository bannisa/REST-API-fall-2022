export default class Book {
    constructor({author,title,year,publishDate,price}) {
        this.id = randomUUID();
        this.author = author;
        this.title = title;
        this.year = year;
        this.publishDate = publishDate;
        this.price = price;
    }
}