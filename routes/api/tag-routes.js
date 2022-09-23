const router = require('express').Router();
// const { TableHints } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{
        model: Product, through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    });
    res.json(allTagData);
  } catch(err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product, through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    });
    res.json(allTagData);
  } catch(err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const allTagData = await Tag.create(req.body);
    res.status(200).json(allTagData);  
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const allTagData = await Tag.update(req.body, {
      where: { id: req.params.id}
    });
    if(!allTagData) {
      res.status(404).json({ message: 'Nothing with this id'});
      return;
    }
    res.status(200).json(allTagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const allTagData = await Tag.destroy({
      where: { id: req.params.id}
    });
    if(!allTagData) {
      res.status(404).json({ message: 'Nothing with this id'});
      return;
    }
    res.status(200).json(allTagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
