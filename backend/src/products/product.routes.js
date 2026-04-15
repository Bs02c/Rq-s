import { Router } from 'express';
import {getAllProductsFromCtrl, insertProductCtrl, patchProCtrl, deleteProdCtrl} from "./product.controller.js";

const routerProduct = Router();

routerProduct.get('/', getAllProductsFromCtrl);
routerProduct.post('/', insertProductCtrl);
routerProduct.patch('/:codigo', patchProCtrl);
routerProduct.delete('/:codigo', deleteProdCtrl);

export default routerProduct; 