import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CONST } from "../constants";
import "../css/style.css";
import AccountMenu from "./AccountMenu";
import "./Nav.css";
import "./NavBar.scss";
import NavBarSub from "./NavBarSub";

function Nav() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [tmpCat, setTempCat] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  const [que, setQue] = useState("");

  async function getCategory() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getCategory");
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/category/get",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    setIsLoaded(true);
    try {
      if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
        setCategory(rsp.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  }

  if (isLoaded === false) {
    setIsLoaded(true);
    getCategory();
  }

  const openMegaMenu = () => {
    // console.log("Hovering .... ");
    // document.getElementsByClassName('my-drop-down-0')[0].style.display = 'inline-block';
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  };
  const openMainMega = (menu) => {
    document.getElementsByClassName("my-drop-megaMenu")[0].style.display =
      "inline-block";
    document.getElementsByClassName(
      "mega-menu-content"
    )[0].innerHTML = `<h1>${menu}</h1>`;
  };
  const closeMega = () => {
    document.getElementsByClassName("my-drop-megaMenu")[0].style.display =
      "none";
    document.getElementsByClassName("my-drop-down-0")[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.overflow = "scroll";
  };

  const submitForm = () => {
    window.location.href = "/search/query/" + que + "/category/any";
  };

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href={"/images/" + CONST.APPFAV} />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href={"/images/" + CONST.APPFAV}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.0.1/mdb.min.css"
          integrity="sha512-GUYp9smrcOHdOrjt2PBcLb7MZkO6EQxUQPtNsTcTmC+slgCv+EcFkL9gIk4CqrmCnV+NnewdEThCmWpnKIBV9w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Helmet>

      <>
        <div className="container-fluid pc-nav">
          <a href="/">
            <span href="/">
              <img
                src={CONST.ADMIN_SERVER + "/images/" + CONST.APPLOGO}
                alt={CONST.APPNAME}
              />
            </span>
          </a>

          <li
            className="myExploreBtn"
            onClick={() => {
              openMegaMenu();
              setIsSidebarOpen(true);
            }}
            onMouseOver={() => {
              setIsSidebarOpen(true);
              openMegaMenu();
            }}
          >
            {" "}
            Explore &nbsp;&nbsp;<i className="fa fa-chevron-down"></i>{" "}
          </li>

          <div
            id="my_c_menu_xyz"
            onClick={() => {
              setIsSidebarOpen(false);
              setIsOpen(false);
              closeMega();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100vh",
              position: "absolute",
              marginTop: "50px",
            }}
          >
            <ul
              className="my-drop-down-0"
              style={{ display: isSidebarOpen ? "inline-block" : "none" }}
            >
              {category.map((cat, i) => (
                <li
                  onMouseOver={() => {
                    setIsOpen(true);
                    setTempCat(cat.title);
                    test(cat.title);
                  }}
                >
                  {" "}
                  {cat.title}{" "}
                </li>
              ))}
            </ul>

            <div
              className="my-drop-megaMenu"
              style={{ display: isOpen ? "inline-block" : "none" }}
            >
              <button
                type="button"
                className="mega-close-button"
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsOpen(false);
                  closeMega();
                }}
              >
                x
              </button>
              <div
                className="mega-menu-content"
                style={{ height: "10vh" }}
              ></div>
              <NavBarSub category={tmpCat} />
            </div>
          </div>

          <div
            id="search-form"
            onSubmit={() => {
              submitForm();
            }}
          >
            <input
              type="text"
              id="search-bar"
              onChange={(e) => {
                setQue(e.target.value);
              }}
              name="query"
              placeholder="What do you want to learn ?"
            />
            <button
              id="explorebtn"
              onClick={() => {
                submitForm();
              }}
            >
              {" "}
              <i className="icofont-search"></i>{" "}
            </button>
          </div>

          <div className="right-menu">
            {/* {CONST.CUSER != null ? <a href="/" onClick={LOGOUT}><span id="joinforbtn" style={{ float: "right" }}>Logout</span></a> : null} */}
            {CONST.CUSER != null ? (
              <AccountMenu name={"Mr. Test"} uid={CONST.CUSER} />
            ) : (
              <a href="/signup">
                <span id="joinforbtn" style={{ float: "right" }}>
                  Join for Free
                </span>
              </a>
            )}

            {CONST.CUSER == null ? (
              <a className="menu-links-right-side" href={"/login"}>
                {" "}
                Login{" "}
              </a>
            ) : null}

            <a href="/career-academy" className="menu-links-right-side">
              {" "}
              Find for New Career{" "}
            </a>

            <a
              href="/degrees"
              className="menu-links-right-side online-degree-btn"
            >
              {" "}
              Online Degrees
              <div className="online-degree">
                <a href={"/degrees"} className="online-degree-menu-item">
                  {" "}
                  <b>Online Degree</b> <br />{" "}
                  <p> Explore Bachelor's & Master's Degree </p>{" "}
                </a>
                <a href={"/mastertrack"} className="online-degree-menu-item">
                  {" "}
                  <b>Master Trick</b> <br />{" "}
                  <p> Earn Credit towards a Master Degree </p>
                </a>
                <a
                  href={"/university-certificates"}
                  className="online-degree-menu-item"
                >
                  {" "}
                  <b>University Certificates</b> <br />{" "}
                  <p> Advance your career with graduate-level Learning </p>{" "}
                </a>
              </div>
            </a>
          </div>
        </div>

        <div className="my-mobile-nav">
          <div className="col-md-12">
            <span id="openMenu">
              {isSidebar ? (
                <i
                  className="icofont-close"
                  onClick={() => {
                    setIsSidebar(false);
                    closeMega();
                  }}
                ></i>
              ) : (
                <i
                  className="icofont-navigation-menu"
                  onClick={() => {
                    setIsSidebar(true);
                    openMegaMenu();
                  }}
                >
                  {" "}
                </i>
              )}
            </span>
            <a href="/">
              <span href="/">
                <img
                  src={CONST.ADMIN_SERVER + "/images/" + CONST.APPLOGO}
                  alt={CONST.APPNAME}
                />
              </span>
            </a>

            <span id="openMenu">
              {!isSearch ? (
                <i
                  className="icofont-search"
                  onClick={() => {
                    isSearch ? setIsSearch(false) : setIsSearch(true);
                  }}
                ></i>
              ) : (
                <i
                  className="icofont-close"
                  onClick={() => {
                    isSearch ? setIsSearch(false) : setIsSearch(true);
                  }}
                ></i>
              )}
            </span>
          </div>
          {isSearch ? (
            <div className="col-md-12">
              <div className="searchBox">
                <div class="input-group">
                  <div class="form-outline">
                    <input
                      type="search"
                      id="form1"
                      class="form-control"
                      style={{ border: "1px solid #eee" }}
                    />
                    <label class="form-label" for="form1">
                      Search
                    </label>
                  </div>
                  <button type="button" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {isSidebar ? (
            <div className="col-md-12 my-side-bar">
              <br /> <br />
              <ul>
                <a href={"/mastertrack"}>
                  {" "}
                  <li className={"menu-item-link"}> For Enterprise </li>{" "}
                </a>
                <a href={"/university-certificates"}>
                  {" "}
                  <li className={"menu-item-link"}> For Universities </li>{" "}
                </a>
                <a href={"/degrees"}>
                  {" "}
                  <li className={"menu-item-link"}> Online Degrees </li>{" "}
                </a>
                <a href={"/career-academy"}>
                  {" "}
                  <li className={"menu-item-link"}>
                    {" "}
                    Find Your New Career{" "}
                  </li>{" "}
                </a>
                <hr />
                <b> Goals </b>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}>
                    {" "}
                    Take a free course{" "}
                  </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}> Earn a Degree </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}>
                    {" "}
                    Earn a Certificate{" "}
                  </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}>
                    {" "}
                    Advance your career{" "}
                  </li>{" "}
                </a>
                <hr />
                <b>Subjects</b>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}> Data Science </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}> Business </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}> Computer Science </li>{" "}
                </a>
                <hr />
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}>
                    {" "}
                    Browse All Subjects{" "}
                  </li>{" "}
                </a>
                <a href={"/"}>
                  {" "}
                  <li className={"menu-item-link"}> Get Our App </li>{" "}
                </a>
              </ul>
              <div className="bottomBar">
                <a href={"/signup"}> Join for Free </a>
                <a href={"/login"}> Login </a>
              </div>
            </div>
          ) : null}
        </div>
      </>
    </>
  );
}

const test = (cat) => {
  document.getElementsByClassName("my-drop-megaMenu")[0].style.display =
    "inline-block";
  document.getElementsByClassName(
    "mega-menu-content"
  )[0].innerHTML = `<h1>${cat}</h1>`;
  return (
    <>
      <NavBarSub category={cat} />
    </>
  );
};

export default Nav;
