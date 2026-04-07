CREATE TABLE product (
    codigo VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    saldo INT NOT NULL,
    costo  INT NOT NULL,
    proveedor VARCHAR(100),
    fecha_ingreso date NOT NULL,
    ubicacion VARCHAR(100),
    stock_minimo INT
);

CREATE TABLE requisiciones(
    consecutivo SERIAL PRIMARY KEY,
    fecha_solicitud date NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    repartidor VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    codigo_solicitado VARCHAR(50) NOT NULL,
    FOREIGN KEY (codigo_solicitado) REFERENCES product(codigo),
    cantidad INT NOT NULL,
    observaciones VARCHAR(255)
);