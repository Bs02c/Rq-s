import { Router } from 'express';
import getAllProductsFromCtrl from "./product.controller.js";

const router = Router();

router.get('/', getAllProductsFromCtrl);
export default router; 