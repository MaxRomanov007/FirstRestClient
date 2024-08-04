import axios from "axios";
import {getImagesArr} from "../utils/images.js";

export default class CarsService {
    static async getCars(filter) {
        return await axios.get("http://localhost:8080/cars", {
            params: {
                limit: filter.limit,
                page: filter.page,
                query: filter.searchQuery,
                order_by: filter.orderBy,
                desc: filter.desc,
            }
        })
            .catch((error) => console.log(error));
    }

    static async deleteCar(number, messageApi, updateCarFetching) {
        await axios.delete("http://localhost:8080/cars/" + number)
            .then(() => {
                updateCarFetching()
                messageApi.open({
                    type: "success",
                    content: "Car updated successfully"
                });
            })
            .catch((err) => {
                console.log(err)
                switch (err.response.status) {
                    case 404:
                        messageApi.open({
                            type: "error",
                            content: "Car not found",
                        });
                        break;
                    case 400:
                        messageApi.open({
                            type: "error",
                            content: err.response.data,
                        });
                        break;
                    case 500:
                        messageApi.open({
                            type: "error",
                            content: "Internal error",
                        })
                        break;
                    default:
                        messageApi.open({
                            type: "error",
                            content: "Error",
                        });
                }
            })
    }

    static async getCar(number) {
        return await axios.get("http://localhost:8080/cars/" + number)
            .catch((error) => console.log(error));
    }

    static async getImages(number) {
        const response = await CarsService.getCar(number);
        return getImagesArr(response.data.number, response.data.images_count)
    }

    static async getImagesItems(number) {
        let images = []
        const imgsArr = await CarsService.getImages(number)
        imgsArr.map((img, index) => {
            images.push({
                uid: index,
                name: "image" + index + ".png",
                status: "done",
                url: img,
            })
        })
        return images
    }

    static async updateCar(formData, messageApi, updateCarFetching) {
        axios
            .put("http://127.0.0.1:8080/update", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                    "Access-Control-Expose-Headers": "Link"
                },
            })
            .then(() => {
                updateCarFetching()
                messageApi.open({
                    type: "success",
                    content: "Car updated successfully"
                });
            })
            .catch((err) => {
                console.log(err)
                switch (err.response.status) {
                    case 404:
                        messageApi.open({
                            type: "error",
                            content: "Car not found",
                        });
                        break;
                    case 400:
                        messageApi.open({
                            type: "error",
                            content: err.response.data,
                        });
                        break;
                    case 500:
                        messageApi.open({
                            type: "error",
                            content: "Internal error",
                        })
                        break;
                    default:
                        messageApi.open({
                            type: "error",
                            content: "Error",
                        });
                }
            });
    }

    static async saveCar(formData, messageApi) {
        axios
            .post("http://127.0.0.1:8080/save", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                    "Access-Control-Expose-Headers": "Link"
                },
            })
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Car saved successfully"
                });
            })
            .catch((err) => {
                console.log(err)
                switch (err.response.status) {
                    case 404:
                        messageApi.open({
                            type: "error",
                            content: "Car not found",
                        });
                        break;
                    case 400:
                        messageApi.open({
                            type: "error",
                            content: err.response.data,
                        });
                        break;
                    case 500:
                        messageApi.open({
                            type: "error",
                            content: "Internal error",
                        })
                        break;
                    default:
                        messageApi.open({
                            type: "error",
                            content: "Error",
                        });
                }
            });
    }
}