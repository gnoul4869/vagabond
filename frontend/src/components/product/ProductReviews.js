import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import { MdThumbUp } from 'react-icons/md';
import PulseLoader from 'react-spinners/PulseLoader';
import { listReviews, updateReview } from '../../redux/actions/reviewActions';
import ErrorPage from '../../pages/error/ErrorPage';
import EmptyReview from '../EmptyReview';
import RatingStars from '../RatingStars';

const ProductReviews = ({ productID }) => {
    const dispatch = useDispatch();

    const { total, reviews, isLoading, isUpdating, error } = useSelector((state) => state.review);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(listReviews(productID));
    }, [dispatch, productID]);

    const likeHandler = (reviewID) => {
        if (!isUpdating) {
            dispatch(updateReview(reviewID, 'like'));
        }
    };

    return (
        <div className="container bg-white mt-3 p-3">
            <div className="bg-label container rounded mb-3">
                <div className="fw-600 fsr-4">Đánh giá sản phẩm</div>
            </div>

            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <PulseLoader
                        color="#c73434"
                        css="display: inherit;"
                        size={12}
                        speedMultiplier={0.9}
                    />
                </div>
            ) : (
                <div className="container">
                    {error && error === 'Không tìm thấy đánh giá nào' ? (
                        <EmptyReview message={error} />
                    ) : error ? (
                        <ErrorPage error={error} backHome={false} />
                    ) : (
                        reviews.length !== 0 &&
                        reviews.map((item) => {
                            const postDate = moment(item.createdAt).format('DD-MM-YYYY HH:mm');
                            console.log(item.likedBy.includes(userInfo.id));
                            return (
                                <div
                                    key={item.id}
                                    className="container text-sdark fsr-2 p-0 p-md-2"
                                >
                                    <div className="row">
                                        <div className="col-auto">
                                            <div className="product-review-user-image-container mt-1">
                                                <div
                                                    className="product-review-user-image"
                                                    style={{
                                                        backgroundImage: `url(${item.createdBy.image})`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column">
                                            <span>{item.createdBy.name}</span>
                                            <div className="mt-1">
                                                <RatingStars
                                                    rating={item.rating}
                                                    css={'text-ired'}
                                                />
                                            </div>
                                            <div className="mt-2 ms-2">
                                                <p>{item.content}</p>
                                            </div>
                                            <div className="fsr-1 text-secondary">{postDate}</div>
                                            <div className="d-inline-flex align-items-center mt-3">
                                                <MdThumbUp
                                                    className={`product-review-like-btn ${
                                                        userInfo &&
                                                        item.likedBy.includes(userInfo.id) &&
                                                        'active'
                                                    }`}
                                                    onClick={() => likeHandler(item.id)}
                                                />
                                                <div className="product-review-like-count">
                                                    {item.numLikes <= 0
                                                        ? 'Hữu ích?'
                                                        : item.numLikes}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider-bottom my-3"></div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
