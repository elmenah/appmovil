const express = require('express');
const cors = require('cors');
const { db } = require('./firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const productsRef = db.collection('pack vinos');
    const snapshot = await productsRef.get();
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un producto
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body;
    const docRef = await db.collection('pack vinos').add(newProduct);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    await db.collection('pack vinos').doc(productId).update(updatedProduct);
    res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
app.delete('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection(collectionName).doc(id).delete();
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));