import { Router } from "express";
const router = Router();

import {createBlocks, updateBlock, getOneBlock, getAllBlock,deleteApartmentBlocks} from "../controllers/blockController.js"


router.route("/create").post(createBlocks);
router.route("/get/all").get(getAllBlock);
router.route("/:id").put(updateBlock).get(getOneBlock).delete(deleteApartmentBlocks);


export default router;
