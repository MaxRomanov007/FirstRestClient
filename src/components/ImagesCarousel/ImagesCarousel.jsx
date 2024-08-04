import {useRef} from 'react';
import classes from "./ImagesCarousel.module.css";
import {Carousel, Image, Space, Spin} from "antd";
import {emptyImage} from "../../constants/index.js";

const ImagesCarousel = ({images, isLoading}) => {
    const carouselRef = useRef(null);

    const changeCarouselSlide = (value) => {
        carouselRef.current.goTo(value)
    }

    if (isLoading) {
        return (
            <Space
                align='center'
                direction="vertical"
                className={classes.carouselLoading}
            >
                <Spin size="large"/>
            </Space>
        )
    }

    return (
        <Image.PreviewGroup
            className={classes.carousel}
            items={images}
            preview={{
                onChange: changeCarouselSlide,
            }}
        >
            <Carousel
                arrows
                className={classes.carousel}
                ref = {carouselRef}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        className={classes.image}
                        width={600}
                        height={400}
                        placeholder={"image #" + index}
                        fallback={emptyImage}
                        src={image}
                    />
                ))}
            </Carousel>
        </Image.PreviewGroup>
    );
};

export default ImagesCarousel;