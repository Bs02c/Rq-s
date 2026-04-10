import { Router } from 'express';
import {getAllProductsFromCtrl, insertProductCtrl, patchProCtrl, deleteProdCtrl} from "./product.controller.js";

const router = Router();

router.get('/', getAllProductsFromCtrl);
router.post('/', insertProductCtrl);
router.patch('/:codigo', patchProCtrl);
router.delete('/:codigo', deleteProdCtrl);
export default router; 