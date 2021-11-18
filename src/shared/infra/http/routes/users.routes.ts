import { Router } from 'express'
import multer from 'multer'
import { uploadConfig } from '../../../../config/upload'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { CreateUserController } from '../../../../modules/accounts/useCases/CreateUser/CreateUserController'
import { UpdateUseAvatarController } from '../../../../modules/accounts/useCases/updateUseAvatar/UpdateUseAvatarController'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUseAvatarController = new UpdateUseAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  uploadAvatar.single('avatar'),
  updateUseAvatarController.handle
)

export { usersRoutes }