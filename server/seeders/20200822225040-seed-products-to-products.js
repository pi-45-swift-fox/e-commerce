'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Products', [
      {name: 'tas selempang', image_url: 'https://cf.shopee.co.id/file/4b825671c1fb7c62fbbbfb1ebb279e91', price: 20000, stock: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'rey jaket touring', image_url: 'https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp', price: 120000, stock: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: 'kemeja pria', image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/11051/11051191/MF_Redcliff_Kemeja_Pria_Lengan_Pendek_6B0168U_1.jpg', price: 66000, stock: 12, createdAt: new Date(), updatedAt: new Date()},
      {name: 'kemeja navi', image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/8604/8604189/MF_HOT_SALE_Kemeja_arlan_navi_atasan_pria_hem_cwo_kemeja_lengan_panjang_1.jpg', price: 65000, stock: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'sepatu caterpillar argon', image_url: 'https://cf.shopee.co.id/file/d70b462521d6a0b758d9a1aa0843d72b', price: 167000, stock: 7, createdAt: new Date(), updatedAt: new Date()},
      {name: 'sneakers puma scuderia', image_url: 'https://ncrsport.com/img/storage/large/306241%2002-1.jpg', price: 1400000, stock: 2, createdAt: new Date(), updatedAt: new Date()}
    ],
    {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
