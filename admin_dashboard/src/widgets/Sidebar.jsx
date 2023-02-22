import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONST, LOGOUT } from '../constant'
import MyMenu from './MenuData'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Sidebar = ({ act }) => {
    const [active, setActive] = useState(act)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [company, setCompany] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [name, setMyName] = useState("...");

    async function user() {
        const cookies = new Cookies();
        const cuser = cookies.get('_adName');
        setMyName(cuser)
    }


    async function getCompany() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/company', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                // console.log("ttl" + ttl);
                setCompany(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getCompany();
        user();
    }

    return (
        <>{isLoading ? <div className='LoaderClass'></div> :
            <>
                <div class="sidebar capsule--rounded bg_img overlay--indigo overlay--opacity-8" data-background="/assets/admin/images/sidebar/2.jpg">
                    <button class="res-sidebar-close-btn"><i class="las la-times"></i></button>
                    <div class="sidebar__inner">
                        <div class="sidebar__logo">
                            <a href={"/"}>
                                <center> <h2 class="sidebar__main-logo">  <img src="/images/logo.png" alt="" /> </h2> </center>
                            </a>
                            {/* <button type="button" class="navbar__expand"></button> */}
                        </div>
                        <div class="sidebar__menu-wrapper" id="sidebar__menuWrapper">
                            <ul class="sidebar__menu">

                                {MyMenu.map((m, i) =>
                                    <li class={active !== m.id ? m.isMulti ? "sidebar-menu-item  sidebar-dropdown" : "sidebar-menu-item" : m.isMulti ? "sidebar-menu-item  active sidebar-dropdown" : "sidebar-menu-item active"}>
                                        <a href={m.isMulti ? null : m.uri} class="nav-link " onClick={() => { active===m.id ? setActive(50000): setActive(m.id) }} >
                                            <i class={m.icon}></i>
                                            <span class="menu-title"> {m.title} </span>
                                        </a>
                                        {!m.isMulti ? null :
                                            <div class="sidebar-submen">
                                                <ul>
                                                    {m.children.map((ch, inx) =>
                                                        <li class="sidebar-menu-item">
                                                            <a href={ch.uri} class="nav-link">
                                                                <i class="menu-icon las la-dot-circle"></i>
                                                                <span class="menu-title"> {ch.title} </span>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        }
                                    </li>
                                )}

                                {/* <li class="sidebar__menu-header">Payments</li> */}

                                <li class={"sidebar-menu-item"}>
                                    <a class="nav-link " onClick={() => { LOGOUT() }} >
                                        <i class={"menu-icon las la-arrow-right"}></i>
                                        <span class="menu-title"> Account Logout</span>
                                    </a>
                                </li>

                            </ul>
                            {/* <div class="text-center mb-3 text-uppercase">
                            <span class="text--primary"></span>
                            <span class="text--success">v1.0 </span>
                        </div> */}
                        </div>
                    </div>
                </div>

                <nav className="navbar-wrapper">
                    <form className="navbar-search" onSubmit="return false;">
                        <button type="submit" className="navbar-search__btn">
                            <i className="las la-search"></i>
                        </button>
                        <input type="search" name="navbar-search__field" id="navbar-search__field" placeholder="Search..." />
                        <button type="button" className="navbar-search__close"><i className="las la-times"></i></button>
                        <div id="navbar_search_result_area">
                            <ul className="navbar_search_result"></ul>
                        </div>
                    </form>
                    <div className="navbar__left">
                        <button className="res-sidebar-open-btn"><i className="las la-bars"></i></button>
                        {/* <button type="button" className="fullscreen-btn">
                            <i className="fullscreen-open las la-compress" onClick="openFullscreen();"></i>
                            <i className="fullscreen-close las la-compress-arrows-alt" onClick="closeFullscreen();"></i>
                        </button> */}
                    </div>
                    <div className="navbar__right">
                        <ul className="navbar__action-list">

                            <li className="dropdown">
                                <button type="button" className="primary--layer" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                    <i className="las la-bell text--primary"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu--md p-0 border-0 box--shadow1 dropdown-menu-right">
                                    <div className="dropdown-menu__header">
                                        <span className="caption">Notification</span>
                                        <p>No unread notification found</p>
                                    </div>
                                    <div className="dropdown-menu__body">
                                    </div>
                                    <div className="dropdown-menu__footer">
                                        <a href="notifications.html" className="view-all-message">View all notification</a>
                                    </div>
                                </div>
                            </li>
                            <li className={isMenuOpen ? "dropdown show" : "dropdown"}>
                                <button type="button" onClick={() => { isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true) }}>
                                    <span className="navbar-user">
                                        <span className="navbar-user__thumb"><img src="/assets/images/default.png" alt="image" /></span>
                                        <span className="navbar-user__info">
                                            <span className="navbar-user__name"> {name} </span>
                                        </span>
                                        <span className="icon"><i className="las la-chevron-circle-down"></i></span>
                                    </span>
                                </button>

                                <div className={isMenuOpen ? "dropdown-menu  dropdown-menu--sm p-0 border-0 box--shadow1 dropdown-menu-right show" : "dropdown-menu  dropdown-menu--sm p-0 border-0 box--shadow1 dropdown-menu-right"}>
                                    <a href="/profile" className="dropdown-menu__item d-flex align-items-center px-3 py-2">
                                        <i className="dropdown-menu__icon las la-user-circle"></i>
                                        <span className="dropdown-menu__caption">Profile</span>
                                    </a>
                                    <a href={"/password"} className="dropdown-menu__item d-flex align-items-center px-3 py-2">
                                        <i className="dropdown-menu__icon las la-key"></i>
                                        <span className="dropdown-menu__caption">Password</span>
                                    </a>
                                    <a onClick={() => { LOGOUT() }} className="dropdown-menu__item d-flex align-items-center px-3 py-2">
                                        <i className="dropdown-menu__icon las la-sign-out-alt"></i>
                                        <span className="dropdown-menu__caption">Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        }
        </>
    )
}
export default Sidebar