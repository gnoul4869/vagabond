import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const ProductCategories = () => {
    return (
        <section>
            <div className="fw-600 fsr-4 text-secondary">Danh mục</div>

            <div className="d-flex flex-wrap mt-2 mt-md-3">
                {categories.map((item) => {
                    return (
                        <div key={item.id} className="category-wrapper">
                            <div className="category-container">
                                <Link to={item.url} className="link-inherit">
                                    <div className="category">
                                        <div className="category-image-container">
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                className="category-image"
                                            />
                                        </div>
                                        <div className="category-name line-clamp-2 text-center fsr-2">
                                            {item.name}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductCategories;
