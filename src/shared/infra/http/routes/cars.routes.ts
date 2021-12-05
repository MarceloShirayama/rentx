import { Router } from 'express'
import multer from 'multer'
import { uploadConfig } from '../../../../config/upload'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const uploadImages = multer(uploadConfig)

carsRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get('/available', listAvailableController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticate,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle
)

export { carsRoutes }
