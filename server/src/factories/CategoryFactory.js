// CategoryFactory.js

const CategoryModel = require('../models/CategoryModel');

// AbstractFactory.js

class AbstractFactory {
  create(name) {}
}

module.exports = AbstractFactory;

// ConcreteFactory.js
class ConcreteFactory extends AbstractFactory {
  async create(name) {
    console.log('Creating category with name ' + name);
    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    return { "nome da categoria salva": name };
  }
}

module.exports = ConcreteFactory;

