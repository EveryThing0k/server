class PositionController {
  async create({ request }) {
    const position = request.only(["name", "access_level", "description"]);
    return position;
  }
}

module.exports = PositionController;
