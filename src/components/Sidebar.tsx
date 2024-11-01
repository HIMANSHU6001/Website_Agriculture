"use client";
import React, { use, useState } from "react";
import account_active from "../../public/assets/icons/Account_active.svg";
import help_active from "../../public/assets/icons/Help_active.svg";
import home_active from "../../public/assets/icons/Home_active.svg";
import news_active from "../../public/assets/icons/News_active.svg";
import support_active from "../../public/assets/icons/Support_active.svg";
import privacy_active from "../../public/assets/icons/Privacy_active.svg";
import settings_active from "../../public/assets/icons/Settings_active.svg";
import test_active from "../../public/assets/icons/Test_active.svg";
import account from "../../public/assets/icons/Account.svg";
import help from "../../public/assets/icons/Help.svg";
import home from "../../public/assets/icons/Home.svg";
import news from "../../public/assets/icons/News.svg";
import support from "../../public/assets/icons/Support.svg";
import privacy from "../../public/assets/icons/Privacy.svg";
import settings from "../../public/assets/icons/Settings.svg";
import test from "../../public/assets/icons/Test.svg";
import logout from "../../public/assets/icons/Logout.svg";
import logo from "../../public/assets/images/logo.png";
import right_arrow from "../../public/assets/icons/right_arrow.svg";
import logo_small from "../../public/assets/images/logo_small.png";
import Image from "next/image";

interface SidebarProps {
  active: string;
  setActive: (active: string) => void;
  setPrevActive?: (active: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  active,
  setActive,
  setPrevActive,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleChange = (component: string) => {
    if (setPrevActive) setPrevActive(active);
    setActive(component);
  };
  return (
    <>
      {/* // Desktop Sidebar */}
      <div className="hidden lg:block h-screen overflow-y-auto border-r-2 border-r-primary_green">
        <Image src={logo} alt="Krushi Saathi Logo" className=" mx-auto" />
        <div className="w-fit mx-auto space-y-3">
          <button
            onClick={() => handleChange("home")}
            className={`flex ${
              active === "home" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "home" ? home_active : home}
              width={20}
              height={20}
              alt="Home"
            />
            Home
          </button>
          <button
            onClick={() => handleChange("account")}
            className={`flex ${
              active === "account" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "account" ? account_active : account}
              width={20}
              height={20}
              alt="Account"
            />
            Account
          </button>
          <button
            onClick={() => handleChange("settings")}
            className={`flex ${
              active === "settings" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "settings" ? settings_active : settings}
              width={20}
              height={20}
              alt="Settings"
            />
            Settings
          </button>
          <button
            onClick={() => handleChange("test")}
            className={`flex ${
              active === "test" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "test" ? test_active : test}
              width={20}
              height={20}
              alt="Test"
            />
            Soil Analysis
          </button>
          <button
            onClick={() => handleChange("news")}
            className={`flex ${
              active === "news" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "news" ? news_active : news}
              width={20}
              height={20}
              alt="News"
            />
            News Feed
          </button>
          <button
            onClick={() => handleChange("support")}
            className={`flex ${
              active === "support" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "support" ? support_active : support}
              width={20}
              height={20}
              alt="Support"
            />
            Help and Support
          </button>
          <button
            onClick={() => handleChange("privacy")}
            className={`flex ${
              active === "privacy" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "privacy" ? privacy_active : privacy}
              width={20}
              height={20}
              alt="Privacy"
            />
            Privacy Policy
          </button>
          <button
            onClick={() => handleChange("help")}
            className={`flex ${
              active === "help" ? "active-side-button" : "side-button"
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={active === "help" ? help_active : help}
              width={20}
              height={20}
              alt="FAQs"
            />
            FAQs
          </button>
          <button
            onClick={() => console.log("logout")}
            className="flex side-button"
          >
            <Image
              priority
              className="mr-3 my-auto"
              color="red"
              src={logout}
              width={20}
              height={20}
              alt="logout"
            />
            Logout
          </button>
        </div>
      </div>

      {/* // Mobile Sidebar */}
      <nav className="flex lg:hidden border-b-2 border-b-primary_green sticky top-0">
        <button
          className="absolute z-50 m-4 space-y-2"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? (
            <>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
            </>
          ) : (
            <>
              <span className="text-2xl ml-2 mb-1">X</span>
            </>
          )}
        </button>
        <div className="mx-auto my-3">
          {/* <Image src={logo_small} width={100} height={100} alt="Krushi Saathi Logo" className=" mx-auto" /> */}

          <h3 className="text-primary_black font-bold text-2xl">
            krushisaathi
          </h3>
        </div>

        <div
          className={`absolute transform duration-100 top-0 bg-white h-fit ${
            showSidebar ? "left-0" : "-left-[410px]"
          }`}
        >
          <h2 className="w-full mx-auto py-3 text-center text-2xl border-b-2 border-b-primary_green font-bold text-primary_black">
            Menu
          </h2>
          <div className="w-full space-y-10 my-10 mx-3">
            <button
              onClick={() => setActive("home")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={home}
                  width={30}
                  height={30}
                  alt="Home"
                />
                Home
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Home"
              />
            </button>
            <button
              onClick={() => setActive("account")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={account}
                  width={25}
                  height={25}
                  alt="Account"
                />
                Account
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Account"
              />
            </button>
            <button
              onClick={() => setActive("settings")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={settings}
                  width={30}
                  height={30}
                  alt="Settings"
                />
                Settings
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Settings"
              />
            </button>
            <button
              onClick={() => setActive("test")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={active === "test" ? test_active : test}
                  width={30}
                  height={30}
                  alt="Test"
                />
                Soil Analysis
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Test"
              />
            </button>
            <button
              onClick={() => setActive("news")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={active === "news" ? news_active : news}
                  width={30}
                  height={30}
                  alt="News"
                />
                News Feed
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="News"
              />
            </button>
            <button
              onClick={() => setActive("support")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={active === "support" ? support_active : support}
                  width={30}
                  height={30}
                  alt="Support"
                />
                Help and Support
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Support"
              />
            </button>
            <button
              onClick={() => setActive("privacy")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={active === "privacy" ? privacy_active : privacy}
                  width={30}
                  height={30}
                  alt="Privacy"
                />
                Privacy Policy
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Privacy"
              />
            </button>
            <button
              onClick={() => setActive("help")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={active === "help" ? help_active : help}
                  width={30}
                  height={30}
                  alt="FAQs"
                />
                FAQs
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="FAQs"
              />
            </button>
            <button
              onClick={() => console.log("logout")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto"
                  src={logout}
                  width={30}
                  height={30}
                  alt="logout"
                />
                Logout
              </span>
              <Image
                priority
                className="mr-3 my-auto"
                src={right_arrow}
                width={18}
                height={18}
                alt="Logout"
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
