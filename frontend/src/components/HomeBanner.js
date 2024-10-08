import React, { useCallback, useEffect, useRef } from 'react';
import { banners } from '../data/banners';
import textureGrid from '../images/texture_grid.png';

const HomeBanner = () => {
    const bannerRef = useRef(null);
    const indexRef = useRef(0);

    const updateHomeBannerIndex = useCallback(() => {
        if (bannerRef.current !== null) {
            let index = Math.floor(Math.random() * banners.length);

            while (index === indexRef.current) {
                index = Math.floor(Math.random() * banners.length);
            }

            const image = new Image();
            image.onload = () => {
                bannerRef.current.style.backgroundImage = `url(${textureGrid}), url(${banners[index].banner})`;
            };
            image.src = banners[index].banner;

            indexRef.current = index;
        }
    }, []);

    useEffect(() => {
        const bannerInterval = setInterval(() => updateHomeBannerIndex(), 5000);
        return () => {
            clearInterval(bannerInterval);
        };
    }, [updateHomeBannerIndex]);

    return (
        <div className="container p-0 m-0">
            <div className="banner" ref={bannerRef}>
                <div className="banner-img-wrapper">
                    <img
                        src={banners[0].banner}
                        alt="vagabond_banner"
                        className="img-fluid"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
