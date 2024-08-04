export const getImagesArr = (number, imagesCount) => {
    let imgs = []

    for (let i = 0; i < imagesCount; i++) {
        imgs.push(`http://localhost:8080/image?number=${number}&id=${i}`)
    }

    return imgs
}