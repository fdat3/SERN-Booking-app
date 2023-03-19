'use strict';

module.exports = {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   firstName: DataTypes.STRING,
  //   lastName: DataTypes.STRING,
  //   address: DataTypes.STRING,
  //   gender: DataTypes.STRING,
  //   roleid: DataTypes.STRING
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: 'datkuteo363',
      firstName: 'Frenkie',
      lastName: 'De Jong',
      address: 'Long An',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
