import express from 'express';
import myRestaurantController from '../controllers/myRestaurantController';
import multer from 'multer';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1025 }, //5mb
});

// /api/my/restaurant
router.get(
  '/order',
  jwtCheck,
  jwtParse,
  myRestaurantController.getMyRestaurantOrders
);

router.patch(
  '/order/:orderId/status',
  jwtCheck,
  jwtParse,
  myRestaurantController.updateOrderStatus
);

router.get('/', jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);
router.post(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.createMyRestaurant
);
router.put(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.updateMyRestaurant
);
export default router;
