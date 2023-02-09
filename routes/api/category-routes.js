const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cat = await Category.findAll({ include: [Product] });
    res.json(cat);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id",async (req, res) => {
  // update a category by its `id` value
  try {
    const update =await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(update)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const cat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(cat)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
