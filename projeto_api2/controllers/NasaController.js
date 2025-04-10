class NasaController {
  constructor(axios) {
    this.axios = axios;
    this.nasa = "http://localhost:4000/novapi";
  }

  async accessData(req, res) {
    const response = await this.axios.get(this.nasa, {
      params: {
        id: req.query.id,
      },
    });
    res.json(this.respData(response));
  }

  respData(response) {
    return { nome: response.data.name };
  }
}

module.exports = NasaController;
