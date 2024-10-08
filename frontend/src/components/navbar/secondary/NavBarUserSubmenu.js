import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../redux/actions/authActions';

const NavBarUserSubmenu = ({ isSubmenuShown, setIsSubmenuShown, targetWidth, isAdmin }) => {
    const submenuContainer = useRef();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        setIsSubmenuShown(false);
    };

    useEffect(() => {
        const submenu = submenuContainer.current;
        const value = targetWidth / 2 - 71;
        submenu.style.right = `${value}px`;
    }, [targetWidth]);

    return (
        <aside className={`navbar-user-submenu ${isSubmenuShown && 'show'}`} ref={submenuContainer}>
            <div className="container">
                <div className="row submenu-item">
                    <Link to="/user/profile">Tài khoản của tôi</Link>
                </div>
                {isAdmin && (
                    <div className="row submenu-item">
                        <Link to="/control">Quản lý</Link>
                    </div>
                )}
                <div className="row submenu-item">
                    <Link to="/user/purchase">Đơn mua</Link>
                </div>
                <div className="row submenu-item">
                    <Link to="#logout" onClick={logoutHandler}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default NavBarUserSubmenu;
