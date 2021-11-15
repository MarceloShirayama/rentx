import fs from 'fs'

export const deleteFile = async (filename: string): Promise<void> => {
  const fileExists = await fs.promises
    .stat(filename)
    .then(() => true)
    .catch(() => false)

  if (!fileExists) return

  await fs.promises.unlink(filename)
}
// TODO: Clean dir tmp/avatar after saving to database
// the function deletes the avatar file only for the same user.
// It would be interesting to delete the file after sending it to the database
