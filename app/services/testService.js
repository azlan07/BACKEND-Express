const testRepository = require('../repositories/testRepository');

module.exports = {
  create(body) {
    return testRepository.create(body);
  },

  update(id, body) {
    return testRepository.update(id, body);
  },

  async getAll() {
    try {
      const test = await testRepository.getAll();
      const count = await testRepository.getTotalCount();

      return {
        data: test,
        count: count,
      };
    } catch (err) {
      return err;
    }
  },

  getByPk(id) {
    return testRepository.getByPk(id);
  },

  destroy(id) {
    return testRepository.destroy(id);
  },
};
