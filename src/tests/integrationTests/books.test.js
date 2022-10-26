import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

await test("Test book Integraion", async (t) => {

    const TEST_PORT = 9009;

    // Bad practice, it's global
    process.env.PORT = TEST_PORT;

    const server = import('../../index.js');

    const TEST_SERVER_ADDRESS = `http://localhost:${TEST_PORT}/books`;
    
    console.log(TEST_SERVER_ADDRESS);

    await t.test('should create a book', async () =>{
        const testData = {
            "author": "Ari and Noah",
            "title": "How to create a REST API",
            "release date" : 2022,
            "price" : "lots of monies"
        }
        
        const request = fetch(TEST_SERVER_ADDRESS,{
                method: 'POST',
                body: JSON.stringify(testData)
            });
        console.log((await request.headers.get('contnet-type'),'application/json'));

        //assert.deepStrictEqual(request.headers.get('contnet-type'),'application/json');

        //assert.deepStrictEqual(request.status, 201);

        const result = await request.json()
        
        // assert.deepStrictEqual(
        //     result.success,
        //     'book added with success',
        //     'The response message should be this'
        // )
        // assert.ok(
        //     result.id.length > 30,
        //     'The ID should be a valid uuid'
        // )
    })

    await promisify(server.close.bind(server))()
})