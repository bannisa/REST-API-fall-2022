import {once} from 'node:events'
import Book from '../entities/book.js';
import { DEFALUT_HEADER } from '../util/util.js';

const routes = ({
    bookService
}) => ({

    '/books : get': async (request, respose) => {
        const result = await bookService.find();
        respose.write(JSON.stringify({results: result}));
        return respose.end();
    },

    '/books : post': async (request, respose) => {
        const data = once(request,'data');
        const item = JSON.parse(data);
        const book = new Book(item);
        
        const id = await bookService.create(book);

        respose.writeHead(201, DEFALUT_HEADER);
        respose.write(JSON.stringifiy({
            id,
            success: 'book added with success'
        }));
        
        return respose.end();
    }
})

export {
    routes
}