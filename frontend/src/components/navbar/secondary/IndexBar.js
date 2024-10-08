import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { Brand, Logo } from '../BrandLogo';
import CartBadge from '../CartBadge';
import NavbarDropdown from './NavbarDropdown';
import SearchBox from '../SearchBox';

const IndexBar = ({ isDropdownShown, setIsDropdownShown }) => {
    return (
        <section>
            <div className="row d-flex align-items-center justify-content-around pb-2 pt-3 pt-md-0 g-0">
                <div className="col-auto d-none d-md-block">
                    <Brand />
                </div>

                <div className="col-auto d-flex d-md-none">
                    <Logo />
                </div>

                <div className="col-auto col-md-7 col-lg-8">
                    <SearchBox />
                </div>

                <div className="col-auto d-flex d-md-none justify-content-center">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsDropdownShown(!isDropdownShown)}
                    >
                        <HiMenu className="text-light" />
                    </button>
                </div>

                <div className="col-auto d-none d-md-flex">
                    <CartBadge />
                </div>
            </div>
            <NavbarDropdown isDropdownShown={isDropdownShown} cartBadge={true} search={false} />
        </section>
    );
};

export default IndexBar;
