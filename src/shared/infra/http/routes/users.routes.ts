import { Router } from 'express'
import multer from 'multer'
import { uploadConfig } from '../../../../config/upload'
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '../../../../modules/accounts/useCases/profileUser/ProfileUserController'
import { UpdateUseAvatarController } from '../../../../modules/accounts/useCases/updateUseAvatar/UpdateUseAvatarController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUseAvatarController = new UpdateUseAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  ensureAdmin,
  uploadAvatar.single('avatar'),
  updateUseAvatarController.handle
)

usersRoutes.get('/profile', ensureAuthenticate, profileUserController.handle)

export { usersRoutes }
