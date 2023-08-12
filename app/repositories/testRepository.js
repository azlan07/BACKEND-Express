const { Test } = require('../models');

module.exports = {
  create(body) {
    return Test.create(body);
  },

  update(id, body) {
    return Test.update(body, { where: { id } });
  },

  getAll() {
    return Test.findAll();
  },

  getTotalCount() {
    return Test.count();
  },

  getByPk(id) {
    return Test.findByPk(id);
  },

  destroy(id) {
    return Test.destroy({ where: { id } });
  },
};
