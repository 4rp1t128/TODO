import express from 'express';
import { getAllUsers, register, getUserById, getUserSpecial, updateUserById, deleteUserById } from '../controllers/user.js';

const router = express.Router();



router.get("/all", getAllUsers);

router.post("/new", register);

/* the route of  this api is same as dynamic routing but it doesn't show error because dynamic 
  routing is below this routing as in express line is executed sequentially so it found this 
  routing first than dynamic routing. We should keep Dynamic Routing at the last */
router.get("/userid/special", getUserSpecial);


//Dynamic Routing
/*router.get("/userid/:id", getUserById);
router.put("/userid/:id", updateUserById);
router.delete("/userid/:id", deleteUserById);
We can also nested this thing in single router */
router
    .route("/userid/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);



export default router;
