const PORT = process.env.PORT;
// const baseUrl_database =
//   process.env.NODE_ENV !== "production"
//     ? `http://localhost:${PORT}`
//     : process.env.API_URL;

const baseUrl_database = process.env.API_URL;

const baseUrl_client = `http://localhost:3000`;

module.exports = {
  baseUrl_database,
  baseUrl_client,
};
