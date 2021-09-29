import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavGenre from "./NavGenre";
import NavInfoList from "./NavInfoList";

const Nav = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else if (window.scrollY === 0) {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavNormalLayout isScroll={isScroll}>
        <NavLayout>
          <NavGenre />
          <NavInfoList />
        </NavLayout>
      </NavNormalLayout>
    </>
  );
};

const NavNormalLayout = styled.div`
  top: 0;
  position: ${props => (props.isScroll ? "sticky" : "relative")};
  width: 100%;
  background: ${props => (props.isScroll ? "rgb(15, 15, 15)" : "transparent")};
  z-index: 999;
`;

const NavLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Nav;
