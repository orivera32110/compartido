const express = require("express"),
    request = require("request-promise"),
    app = express(),
    puerto = 3000,
    RUTA_SERVIDOR = "https://api.cencosud.cl/v1.0/sm/cl/articulos/precios?fechaDesde=2018-05-01" +
    "&apiKey=xxxxxx&idLocalSap=Jxx" +
    "&ean13=";
app.use(express.static('public'));
app.get('/api/:ean13', (peticion, respuesta) => {
    // Obtener el ean13 de la URL
    let ean13 = peticion.params.ean13;
    console.log("Información de :", ean13);
    //https://parzibyte.me/blog/2019/01/19/peticion-http-get-simple-node-js-request/
    request({
            uri: RUTA_SERVIDOR + ean13, // Concatenar al hacer la operación
            json: true,
        }).then(datosDeProducto => {
            respuesta.setHeader("Content-Type", "application/json");
            respuesta.send(datosDeProducto);
        })
        .catch(err => {
            respuesta.send(err);
        });
});
// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(puerto, err => {
    if (err) {
        // Aquí manejar el error
        console.error("Error escuchando: ", err);
        return;
    }
    // Si no se detuvo arriba con el return, entonces todo va bien ;)
    console.log(`Escuchando en el puerto :${puerto}`);
});