const PORT = process.env.PORT;
const baseUrl_database =
  process.env.NODE_ENV !== "production"
    ? `http://localhost:${PORT}`
    : process.env.API_URL;

const baseUrl_client =
  process.env.NODE_ENV !== "production"
    ? `http://localhost:3000`
    : process.env.CLIENT_URL || `http://localhost:3000`;

module.exports = {
  baseUrl_database,
  baseUrl_client,
};
