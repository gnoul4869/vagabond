import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import moment from 'moment';
import PriceFormat from '../PriceFormat';
import RatingStars from '../RatingStars';
import { normalizeViet } from '../../utils/normalizeViet';

const ProductCards = ({ product, isAlt, showRatings, showSales, showDate, cartBtnHandler }) => {
    const productName = normalizeViet(product.name.replace(/ |\//g, '-'), false);

    return (
        <>
            <div key={product.id} className={`product-wrapper${isAlt ? '-alt' : ''}`}>
                <div className="product-container">
                    <Link to={`/products/${productName}.${product.id}`} className="link-inherit">
                        <div className="product-image-container">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>
                        <div className="product-name line-clamp-2">{product.name}</div>
                    </Link>

                    <div className="product-bottom">
                        <div className="product-info-container">
                            <div className="product-price">
                                <PriceFormat price={product.price} />
                            </div>
                            {showRatings && (
                                <div className="product-rating d-flex flex-column d-md-inline fsr-1">
                                    <div className="d-inline-flex icon">
                                        <RatingStars rating={product.rating} css={'text-ystar'} />
                                    </div>
                                    <span className="separator-gray d-none d-md-inline"></span>
                                    <span className="text-secondary mt-1 mt-md-0">
                                        {`${product.numReviews} lượt đánh giá`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {cartBtnHandler && (
                            <button
                                type="button"
                                className="product-cart-btn"
                                onClick={() => cartBtnHandler(product.id)}
                            >
                                <FaCartPlus className="icon" />
                            </button>
                        )}
                    </div>

                    {showSales && (
                        <div className="d-inline text-center bg-ired text-white fw-600 fsr-1 mt-1">
                            <span className="me-2">Đã bán</span>
                            <span>{product.numSales}</span>
                        </div>
                    )}

                    {showDate && (
                        <div className="d-inline text-center bg-teal text-white fw-600 fsr-1 mt-1">
                            <span className="me-2">Ngày cập nhật</span>
                            <span>{moment(product.createdAt).format('DD/MM/YYYY')}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCards;
