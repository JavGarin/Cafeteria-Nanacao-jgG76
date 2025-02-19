const request = require("supertest");
const server = require("../index");
import {expect, jest, test} from '@jest/globals';

describe("Operaciones CRUD de cafes", () => {
    // test para GET /cafes
    it("resultado un 200 y un arreglo con un objeto al hacer GET /cafes", 
        async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200); // para verificar que el status sea code 200
        expect(response.body).toBeInstanceOf(Array); // verifica que la respuesta sea un arreglo
        expect(response.body.lenght).toBeGreaterThan(0); // para verificar que el arreglo este vacío

    });

    // test para GET /cafes/:id (caso exitoso)
    it("sacando un status 200 y un objeto GET /cafes/:id con un id existente",
        async () => {
            const id = 1; // id de un cafe que exista en cafes.json
            const response = (await request(server).get(`/cafes/${id}`)).send();
            expect(response.statusCode).toBe(200); //verificamos que el status sea 200
            expect(response.body).toBeInstanceOf(Object); // verificamos que la respuesta sea un object
            expect(response.body.id).toBe(id); // se verifica que el ID coincida
        });






});
