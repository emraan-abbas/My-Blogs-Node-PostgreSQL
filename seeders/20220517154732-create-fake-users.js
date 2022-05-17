'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('People', [{ // Dummy Data here
      name: 'fake name 1',
      email: 'fake1@gmail.com',
      password: 12345,
      uuid: '12345-4567-678',
      role: 'Simple User',
      status: 'Active'
    },
    {
      name: 'fake name 1',
      email: 'fake1@gmail.com',
      password: 12345,
      uuid: '12345-4567-678',
      role: 'Simple User',
      status: 'Active'
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
