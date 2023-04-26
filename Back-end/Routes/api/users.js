const express = require("express");
const controllers = require("../../controllers/UserController.js");
const router = express.Router();

router.route("/users")
.get(controllers.getUsers)
.post(controllers.createUser);
router
 .route("/users/:id")
 .get(controllers.getUserById)
 .put(controllers.updateUser)
 .delete(controllers.deleteUser);
module.exports = router;