import getAllProductsFromService from "./product.service.js";

    async function getAllProductsFromCtrl(req, res) {
        const result = await getAllProductsFromService();
        res.json(result);
    }

 export default getAllProductsFromCtrl;