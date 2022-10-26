import BookRepository from "../repositories/bookRepository.js";
import BookServie from "../services/bookService.js";

const generateInstance = ({
    pathname
}) => {
    // database connections here
    const bookRepository = new BookRepository({file:pathname});

    const bookService = new BookServie({bookRepository})

    return bookService;
}

export {
    generateInstance
};