// Add logic/CRUD ops in controllers
const Item = require('../Models/Item');

// get all items
const getAllItems = async (req, res, next) => {
  const items = await Item.find();
  if (!items) return res.status(204).json({ "message": "No items found" });
  res.json(items);
};

// create a new item
const createNewItem = async (req, res, next) => {
  if (!req?.body) {
    return res.status(400).json({ 'message': 'Item is required' });
  }

  try {
    const newItem = new Item({
      ...req.body,
      // owner: req.user._id
  })
     await newItem.save()
     res.status(201).send(newItem);
  } catch(error) {
    console.log(error);
  }
};

// update an item
// const updateItem = async (req, res, next) => {
//   if (!req?.body?.id) {
//     return res.status(400).json({ 'message': 'Product ID parameter is required' });
//   }
//   const product = await Product.findOne({ _id: req.body.id }).exec();

//   if (!product) {
//     return res.status(204).json({ message: `Product ID ${req.body.id} does not match any product` });
//   }
//   if  (req.body?.name) product.name = req.body.name;
//   if (req.body?.description) product.description = req.body.description;
//   if (req.body?.price) product.price = req.body.price;

//   const result = await product.save();

//   res.status(200).json(result);
// };
const updateItem = async (req, res, next) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'description', 'category', 'price']
  
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
      return res.status(400).send({ error: 'invalid updates'})
  }
  try {
    const item = await Item.findOne({ _id: req.params.id})
    if(!item){
        return res.status(404).send()
    }
    updates.forEach((update) => item[update] = req.body[update])
    await item.save()
    res.send(item)
  } catch (error) {
  res.status(400).send(error)
  }
}  

// delete a product
const deleteItem = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Item ID required' });
  }
  const item = await Item.findOne({ _id: req.body.id }).exec();

  if (!item) {
    return res.status(204).json({ message: `Item ID ${req.body.id} does not match any item` });
  }
  const result = await item.deleteOne({ _id: req.body.id });

  res.status(200).json(result);
};

// get a single product
const getItem = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'Product ID required' });
  }
  const item = await Item.findOne({ _id: req.params.id }).exec();

  if (!item) {
    return res.status(204).json({ message: `Item ID ${req.params.id} does not match any item` });
  }
  res.status(200).json(item);
};

module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItem
};
