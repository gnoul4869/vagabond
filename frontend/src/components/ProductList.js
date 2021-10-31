import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { listProducts } from '../actions/productActions';
import Loading from './Loading';
import RatingStars from './Rating';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <section className="container-fluid bg-trasparent my-4 p-3">
            <div className="row-cols-2 row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    products.map((item) => {
                        return (
                            <Link to={`/product/${item._id}`} className="link-tag">
                                <div key={item._id} className="col">
                                    <div className="product-list-card card shadow-sm">
                                        <div className="ratio ratio-1x1">
                                            <img
                                                src={item.image}
                                                className="product-list-image card-img-top"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column text-start">
                                            <div className="text-secondary fw-bold flex-fill">
                                                {item.name.length >= 48
                                                    ? `${item.name.substring(0, 45)}...`
                                                    : item.name}
                                            </div>
                                            <div className="product-list-price fs-5">
                                                <NumberFormat
                                                    value={item.price}
                                                    displayType={'text'}
                                                    thousandSeparator={'.'}
                                                    decimalSeparator={','}
                                                    prefix={'₫'}
                                                ></NumberFormat>
                                            </div>
                                            <RatingStars
                                                rating={item.rating}
                                                numReviews={item.numReviews}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default ProductList;
