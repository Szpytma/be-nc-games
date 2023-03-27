const app = require("./app");
const PORT = 9090;

try {
  app.listen(PORT, () => {
    console.log(`nc-games listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error.msg);
}
