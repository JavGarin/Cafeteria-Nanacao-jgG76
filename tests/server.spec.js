const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    // test para GET /cafes
    it("resultado un 200 y un arreglo con un objeto al hacer GET /cafes", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200); // que el status code sea 200
        expect(response.body).toBeInstanceOf(Array); // que la respuesta sea un arreglo
        expect(response.body.length).toBeGreaterThan(0); // verifico que el arreglo no esté vacío
    });

    // test para GET (caso exitoso)
    it("sacando un status 200 y un objeto GET /cafes/:id con un id existente", async () => {
        const id = 1;
        const response = await request(server).get(`/cafes/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.id).toBe(id);
    });

    // test para GET (caso fallido)
    it("obteniendo un 404 al hacer GET /cafes/:id con un ID que no existe", async () => {
        const id = 8;
        const response = await request(server).get(`/cafes/${id}`);
        expect(response.statusCode).toBe(404);
    });

    // test para POST /cafes
    it("obteniendo un 201 al agregar un nuevo cafe con POST /cafes", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server).post("/cafes").send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe); // verifico que el nuevo café esté en la respuesta
    });

    // test para el PUT
    it("obteniendo un 200 al actualizar un cafe con PUT /cafes/:id", async () => {
        const id = 1;
        const cafeActualizado = { id: 1, nombre: "Cortado Actualizado" };
        const response = await request(server).put(`/cafes/${id}`).send(cafeActualizado);
        expect(response.statusCode).toBe(200);
        expect(response.body).toContainEqual(cafeActualizado);
    });

    // test para DELETE (caso fallido)
    it("obteniendo un 400 al eliminar un café con DELETE /cafes/:id si no se retorna un token", async () => {
        const id = 1;
        const response = await request(server).delete(`/cafes/${id}`).send();
        expect(response.statusCode).toBe(400);
    });
});
