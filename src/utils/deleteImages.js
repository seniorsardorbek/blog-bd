import fs from 'fs/promises'

export const deletImages  = async (images) => {
    try {
      const imagesPath = images.map(image => `./uploads/${image}`)
      console.log(imagesPath);
      await Promise.all(imagesPath.map(async imagePath => {
          fs.unlink(imagePath).then((res) => {
              console.log("Deleted");
          }).catch((err) => {
              console.error("Error deleting file:", err);
          })
      }))
      
    } catch (error) {
        console.log("when deleting images " ,error);
    }
  }