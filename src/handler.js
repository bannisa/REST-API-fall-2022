import {
    join,
    dirname
} from 'node:path';
import {
    fileURLToPath
} from 'node:url';
import { parse } from 'node:url';
import { DEFALUT_HEADER } from './util/util.js';
import { routes } from './routes/bookRoute.js';

import { generateInstance } from './factories/bookFactory.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

const filePath = join(currentDir,'./../database','books.json');

const myBookServie = generateInstance({filePath});

const bookRoutes = routes({
    myBookServie
});

const allRoutes = {
    
    ...bookRoutes,
    default: async (request, respose) => {
        respose.writeHead(404, DEFALUT_HEADER);
        respose.write("Whoops, path not found")
        respose.end();
    }

};

function handler(request, response) {
    const {
        url,
        method
    } = request;

    const {

        pathname
        
    } = parse(url,true);

    const key = `${pathname} : ${method.toLowerCase()}`;

    const chosenRoute = allRoutes[key] || allRoutes.default;

    console.log(key);

    return Promise.resolve(chosenRoute(request,response)).catch(handlerError(response));

}

function handlerError(respose) {

    return error => {

        console.log("Something bad has happened : ", error.stack);

        respose.writeHead(500, DEFALUT_HEADER);

        respose.write(JSON.stringify({ error : 'internal server error' }));
    };

    return respose.end();
}

export default handler