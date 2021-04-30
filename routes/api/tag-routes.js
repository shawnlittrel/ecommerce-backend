const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ['product_name']
      }
    ]
  })
  .then(tagPostData => {
    if (!tagPostData) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.json(tagPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ['product_name']
      }
    ]
  })
  .then(tagPostData => {
    if(!tagPostData) {
      res.status(404).json({ message: 'No tags found with that id.' });
      return;
    }
    res.json(tagPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// create a new tag
router.post('/', (req, res) => {
   Tag.create({
     tag_name: req.body.tag_name
   })
   .then(tagPostData => {
     res.json(tagPostData);
   })
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(tagPostData => {
    if (!tagPostData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }
    res.json(tagPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagPostData => {
    if (!tagPostData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;
    }
    res.json(tagPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


module.exports = router;
