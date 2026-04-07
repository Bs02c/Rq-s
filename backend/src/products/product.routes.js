import { Router } from 'express';
import {getAllProductsFromCtrl, insertProductCtrl} from "./product.controller.js";

const router = Router();

router.get('/', getAllProductsFromCtrl);
router.post('/', insertProductCtrl);
export default router; 