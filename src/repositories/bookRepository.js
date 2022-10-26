import {
    readFile,
    writeFile
} from 'node:fs/promises'

export default class BookRepository {
    constructor({
        file
    }) {
        this.file = file;
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.file));
    }

    find(){
        return this.#currentFileContent();
    }

    async create(data){
        let currentFile = await this.#currentFileContent();
        if(typeof(currentFile) != typeof(Array())) {
            currentFile = Array(currentFile);
        }

        currentFile.push(data);

        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        )

        return data.id;
    }
}