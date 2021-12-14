import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import ProductCards from '../product/ProductCards';

const HomeNewestProducts = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setIsLoading(true);
        }

        const getNewestProducts = async () => {
            try {
                const { data } = await axios.get('/api/v1/products', {
                    params: { search: '', sort: 'newest', category: '', page: 1, limit: 5 },
                });

                const { products } = data;

                if (isMounted) {
                    setNewestProducts(products);
                    setError('');
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa'
                    );
                    setIsLoading(false);
                }
            }
        };

        getNewestProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="container bg-white p-3">
            <div className="fw-600 fsr-4 text-secondary">Sản phẩm mới</div>

            <div className="d-flex flex-wrap mt-2 mt-md-3">
                {isLoading ? (
                    <PulseLoader
                        color="#c73434"
                        css="display: inherit; margin: 10rem auto;"
                        width="3.125rem"
                        speedMultiplier={0.9}
                    />
                ) : error ? (
                    <div className="text-pinker fsr-5 mx-auto py-5">{error}</div>
                ) : (
                    newestProducts.length !== 0 &&
                    newestProducts.map((item) => {
                        return (
                            <ProductCards
                                key={item.id}
                                product={item}
                                showRatings={false}
                                showSales={false}
                                showDate={true}
                                cartBtnHandler={false}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default HomeNewestProducts;
