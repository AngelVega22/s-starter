const controller = {};
const pool = require('../connection')

//list
controller.list = (req, res) => {
    const producto = pool.query("SELECT * FROM producto", (err, producto) => {
        if (err) {
            res.json(err);
        }
        res.render("index/index", {
            data: producto,
        });
    });
};
//Listar productos en el dashboard -- proximamente listar productos por usuario
controller.miList = (req, res) => {
    const producto = pool.query("SELECT * FROM producto", (err, producto) => {
        if (err) {
            res.json(err);
        }

        res.render("partials/miList", {
            data: producto,
        });
    });
}
//Eliminar producto/servicio
controller.deleteProducto = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM producto WHERE ID = ?', [id]);

    res.redirect('/miList');
};

//Agregar producto/servicio
controller.addProducto = async (req, res) => {
    const { nombre_artista, descripcion, genero, url_img, precio } = req.body;
    const newProduct = {
        nombre_artista,
        descripcion,
        url_img,
        genero,
        precio,
        // id: req.user.id
    };
    await pool.query('INSERT INTO producto set ?', [newProduct]);
    res.redirect('/miList');
}

//Editar producto
controller.updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre_artista, descripcion, genero, url_img, precio } = req.body;
    const newProduct = {
        nombre_artista, descripcion, genero, url_img, precio
    };
    await pool.query('UPDATE producto set ? WHERE id = ?', [newProduct, id]);
    res.redirect('/miList');
}

module.exports = controller;