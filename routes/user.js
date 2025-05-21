import express from 'express';
import { getAllUsers, register, login, getMyProfile, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();



router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

/* the route of  this api is same as dynamic routing but it doesn't show error because dynamic 
  routing is below this routing as in express line is executed sequentially so it found this 
  routing first than dynamic routing. We should keep Dynamic Routing at the last */
// router.get("/userid/special", getUserSpecial);


//Dynamic Routing
/*router.get("/userid/:id", getUserById);
router.put("/userid/:id", updateUserById);
router.delete("/userid/:id", deleteUserById);
We can also nested this thing in single router because /users is same for all the api */
//clubbing of routers with same prefix
// router
//     .route("/userid/:id")
//     .get(getUserById)
//     .put(updateUserById)
//     .delete(deleteUserById);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/all", isAuthenticated, getAllUsers);



export default router;
