const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll();
    res.json(allCategoryData);
  } catch(err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['product_name', 'price', 'stock'],
      }]
    });
    res.json(allCategoryData);
  } catch(err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const allCategoryData = await Category.create(req.body);
    res.status(200).json(allCategoryData);  
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const allCategoryData = await Category.update(req.body, {
      where: { id: req.params.id}
    });
    if(!allCategoryData) {
      res.status(404).json({ message: 'Nothing with this id'});
      return;
    }
    res.status(200).json(allCategoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const allCategoryData = await Category.destroy({
      where: { id: req.params.id}
    });
    if(!allCategoryData) {
      res.status(404).json({ message: 'Nothing with this id'});
      return;
    }
    res.status(200).json(allCategoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
