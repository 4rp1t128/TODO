import express from 'express';
import { getAllUsers, register, getUserById, getUserSpecial } from '../controllers/user.js';

const router = express.Router();



router.get("/all", getAllUsers);

router.post("/new", register);

/* the route of  this api is same as dynamic routing but it doesn't show error because dynamic 
  routing is below this routing as in express line is executed sequentially so it found this 
  routing first than dynamic routing. We should keep Dynamic Routing at the last */
router.get("/userid/special", getUserSpecial);


//Dynamic Routing
router.get("/userid/:id", getUserById);




export default router;
