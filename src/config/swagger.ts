import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Apartment Management API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ], 
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        },
    },
    apis: ["./src/docs/*.ts"],
}); 