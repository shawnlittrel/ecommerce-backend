const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categoryResData) => {
      if (!categoryResData) {
        res.status(404).json({ message: "No categories found." });
        return;
      }
      res.json(categoryResData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((categoryResData) => {
      if (!categoryResData) {
        res.status(404).json({ message: "No category found with that id." });
        return;
      }
      res.json(categoryResData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryPostData) => res.json(categoryPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((categoryPostData) => {
    if (!categoryPostData) {
      res.status(404).json({ message: "No category with that id found." });
      return;
    }
    res.json(categoryPostData);
  });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryPostData) => {
      if (!categoryPostData) {
        res.status(404).json({ message: "No category with that id found." });
        return;
      }
      res.json(categoryPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
