import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
const HomeBanner = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item style={{height:'100%'}}>
                            <video className="w-100" autoPlay playsInline muted loop>
                                <source src={'../assets/videos/v2.mp4'} type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        <Carousel.Item>
                            <video className="w-100" autoPlay playsInline muted loop>
                                <source src={"../assets/videos/v1.mp4"} type="video/mp4" />
                            </video>
                        </Carousel.Item>
                    </Carousel>
                </div>
        </div>
    )
}
export default HomeBanner;