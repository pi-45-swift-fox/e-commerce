'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      name: 'Programming in C',
      image_url: 'https://4.imimg.com/data4/RD/EF/MY-8205359/programming-in-c-250x250.png',
      price: 100000,
      stock:3,
      sold:20,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'Intruduction to Python',
      image_url: 'https://nclab.com/wp-content/media/2018/08/python-ebook-3d.png',
      price: 120000,
      stock:42,
      sold:100,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'Javascript Basic ',
      image_url: 'https://images-na.ssl-images-amazon.com/images/I/61XTGcDr%2BgL._UX300__PJku-sticker-v7,TopRight,0,-50__BG0,0,0,0_FMpng_AC_UL600_SR600,600_.jpg',
      price: 125000,
      stock:7,
      sold:50,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'Hands-On System Programming with Linux ',
      image_url: 'https://kaiwantech.files.wordpress.com/2018/11/cover_final_hospl.png',
      price: 150000,
      stock:10,
      sold:10,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'C Programming with Arduino',
      image_url: 'https://www.elektor.com/media/catalog/product/cache/1404d1bfd8e1ad71cc6f16950ff5c805/c/-/c-programming-with-arduino.png',
      price: 85000,
      stock:23,
      sold:5,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'Python Network Programming',
      image_url: 'https://static.packt-cdn.com/products/9781788835466/cover/smaller',
      price: 189000,
      stock:11,
      sold:5,
      updatedAt: new Date(),
      createdAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
