const testService = require('../../../services/testService');
const path = require('path');
const fs = require('fs');

module.exports = {
  async handleCreateTest(req, res, url) {
    try {
      req.body.file = url
      const body = req.body;
      const test = await testService.create(body);

      res.status(201).json({
        status: 'OK',
        data: test,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleUpdateTest(req, res) {
    try {
      const body = req.body;
      const id = req.params.id;

      const test = await testService.update(id, body);

      res.status(201).json({
        status: 'OK',
        data: test,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.message,
      });
    }
  },

  async handleGetAllTest(req, res) {
    try {
      const { data, count } = await testService.getAll();

      res.status(201).json({
        status: 'OK',
        data: data,
        count: count,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async handleGetTestByPk(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const test = await testService.getByPk(id);
      res.status(201).json({
        status: 'OK',
        data: test,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleGetFile(req, res) {
    try {
      const filename = req.params.filename;
      console.log("filename", filename);
      const publicDirectory = path.join(__dirname, "../../../../public");
      const uploadDirectory = path.join(publicDirectory, "uploads", filename);

      const data = await fs.promises.readFile(uploadDirectory);
      res.status(200).send(data);
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({
        status: "ERROR",
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  },


  async handleDeleteTest(req, res) {
    try {
      const id = req.params.id;
      await testService.destroy(id);

      res.status(201).json({
        status: 'OK',
        message: 'skck successfully deleted',
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};
