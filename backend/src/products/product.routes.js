import { Router } from 'express';
import {getAllProductsFromCtrl, insertProductCtrl, patchProCtrl} from "./product.controller.js";

const router = Router();

router.get('/', getAllProductsFromCtrl);
router.post('/', insertProductCtrl);
router.patch('/:codigo', patchProCtrl);
export default router; 