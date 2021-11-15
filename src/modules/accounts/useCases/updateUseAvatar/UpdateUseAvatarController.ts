import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUseAvatarUseCase } from './UpdateUseAvatarUseCase'

export class UpdateUseAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    const avatarFile: string | undefined = req.file?.filename

    const updateUseAvatarUseCase = container.resolve(UpdateUseAvatarUseCase)

    await updateUseAvatarUseCase.execute({ user_id: id, avatarFile })

    return res.status(204).send()
  }
}
