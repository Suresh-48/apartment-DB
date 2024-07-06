import { Router } from "express";
const router = Router();

import {createFlat,updateFlat,getOneFlat,getAllFlat,deleteApartmentFlat} from "../controllers/flatController.js";


router.route("/create").post(createFlat);
router.route("/get/all").get(getAllFlat);
router.route("/:id").put(updateFlat).get(getOneFlat).delete(deleteApartmentFlat);


export default router;