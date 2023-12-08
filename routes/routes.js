const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/token'); 
const User = require('../models/usuarios');
const Product = require('../models/productos');



// insertar algo en la ruta de la BD
router.post('/addUser', verificarToken, async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
    });
    
    try {
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'Usuario agregado con exito'
        };
        res.json({message: 'usuario agregado con exito'});
    } catch (err) {
        res.json({message: err.message, type: 'danger'});
    }
});

// obtener los usuarios
router.get('/usuarios', verificarToken, async(req, res)=>{
    try {
        const users = await User.find().exec();
        console.log(users)
        res.render('index', {
            title: "Home Page",
            users: users,
        });
    } catch (err) {
        res.json({message: err.message});
    }
});

//editar un usuario (obtenerlo realmente, como para mostrar los datos por pantalla para editarlos, no se usa)
// router.get('/editUser/:id', async (req,res)=>{
//     let {id}=req.params.id;
//     try {
//         const user = await  User.findById(id);
//         if(user==null){
//             res.send('Usuario no encontrado');
//         }else{
//             console.log(user)
//         }
//     } catch (err) {
//         res.json({message: err.message})
//     }
    
// });

// actualizar usuarios
router.put('/updateUser/:id', verificarToken, async(req,res)=>{
    let id = req.params.id;
    const ObjectId = require('mongodb').ObjectId;
    const idO = new ObjectId(id);
    console.log(idO)
    try {
        await User.findByIdAndUpdate(idO, {
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
        }, {new: true, useFindAndModify: false})
        req.session.message = {
            type: 'success',
            message: 'usuario editado con exito',
        }
        res.json({message: 'usuario editado con exito'});
    } catch (err) {
        res.json({message: err.message})
    }
});

// eliminar usuarios
router.delete('/deleteUser/:id', verificarToken, async(req,res)=>{
    let id = req.params.id;
    const ObjectId = require('mongodb').ObjectId;
    const idO = new ObjectId(id);
    console.log(idO)
    try {
        await User.findByIdAndDelete(idO)
        res.json({message: 'usuario eliminado con exito'});
    } catch (err) {
        res.json({message: err.message})
    }
});


router.post('/addProduct', verificarToken, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    
    try {
        await product.save();
        req.session.message = {
            type: 'success',
            message: 'Producto agregado con exito'
        };
        res.json({message: 'producto agregado con exito'});
    } catch (err) {
        res.json({message: err.message, type: 'danger'});
    }
});


// obtener productos
router.get('/productos', verificarToken, async(req,res)=>{
    try {
        const products = await Product.find().exec();
        console.log(products)
        res.render('index', {
            title: "Home Page",
            products: products,
        });
    } catch (err) {
        res.json({message: err.message});
    }
});


// editar productos
router.put('/updateProduct/:id', verificarToken, async(req,res)=>{
    let id = req.params.id;
    const ObjectId = require('mongodb').ObjectId;
    const idO = new ObjectId(id);
    console.log(idO)
    try {
        await Product.findByIdAndUpdate(idO, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }, {new: true, useFindAndModify: false})
        req.session.message = {
            type: 'success',
            message: 'Producto editado con exito',
        }
        res.json({message: 'producto editado con exito'});
    } catch (err) {
        res.json({message: err.message})
    }
});


// eliminar productos
router.delete('/deleteProducto/:id', verificarToken, async(req,res)=>{
    let id = req.params.id;
    const ObjectId = require('mongodb').ObjectId;
    const idO = new ObjectId(id);
    console.log(idO)
    try {
        await Product.findByIdAndDelete(idO)
        res.json({message: 'producto eliminado con exito'});
    } catch (err) {
        res.json({message: err.message})
    }
});

module.exports = router;