import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import logo from '../assets/logo-coverit.png';

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <HeaderStyle className={menu ? 'open' : ''}>
      <Icon>
        <FontAwesomeIcon icon={faBars} onClick={handleMenu} />
      </Icon>

      <Container>
        <Link to="/">
          <Image src={logo} alt="Coverit" />
        </Link>

        <Nav className={menu ? 'open' : ''}>
          <NavList>
            <NavListItem>
              <NavListItemA href="http://cover-it.com.NavListItemAr/">
                Inicio
              </NavListItemA>
            </NavListItem>
            <NavListItem>
              <NavListItemA href="http://cover-it.com.ar/nosotros/">
                Nosotros
              </NavListItemA>
            </NavListItem>
            <NavListItem>
              <NavListItemA href="http://cover-it.com.ar/promo/">
                Promo CAGNOLI
              </NavListItemA>
            </NavListItem>
            <NavListItem>
              <NavListItemA href="http://cover-it.com.ar/preguntas-frecuentes/">
                Preguntas Frecuentes
              </NavListItemA>
            </NavListItem>
            <NavListItem>
              <NavListItemA href="http://cover-it.com.ar/contacto/">
                Contacto
              </NavListItemA>
            </NavListItem>
            <NavListItem>
              <NavListItemA href="tel:+5491136690201">
                0800 333 3333
              </NavListItemA>
            </NavListItem>
          </NavList>
        </Nav>
      </Container>
    </HeaderStyle>
  );
};

export default Header;

/*
 *
 *
 * STYLES
 *
 *
*/

const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 1000px) {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
`;

const HeaderStyle = styled.header`
  padding: 0 15px;
  height: 100px;
  background: #fff;
  align-items: center;
  position: relative;
  box-shadow: 3px 4px 10px 0px rgba(74, 42, 62, 0.1);
  transition: height 0.5s;
  &.open {
    height: 380px;
  }
  @media screen and (min-width: 1000px) {
    padding: 0;
  }
`;

const Image = styled.img`
  width: 130px;
  position: absolute;
  left: calc(50% - 65px);
  top: 34px;
  @media screen and (min-width: 1000px) {
    position: static;
    width: 178px;
    margin-top: 30px;
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 15px;
  top: 43px;
  font-size: 14px;
  color: #9d9d9d;
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 0.5s;
  position: absolute;
  left: 0;
  top: 100px;
  &.open {
    height: 280px;
  }
  @media screen and (min-width: 1000px) {
    height: 100%;
    width: 100%;
    position: static;
    width: auto;
  }
`;

const NavList = styled.ul`
  height: 100%;
  list-style: none;
  @media screen and (min-width: 1000px) {
    display: flex;
    align-items: center;
  }
`;

const NavListItem = styled.li`
  border-bottom: 1px solid #eaeaea;
  padding: 0 15px;
  &:last-child {
    border: none;
  }
  &:hover a {
    color: #0fbbba;
  }
  @media screen and (min-width: 1000px) {
    border: none;
    height: 100%;
    padding: 0;
  }
`;

const NavListItemA = styled.a`
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  color: #888;
  padding: 10px 0;
  display: block;
  position: relative;
  text-transform: none;
  line-height: 26px;
  letter-spacing: 0;
  transition: color 0.3s ease-in-out;
  @media screen and (min-width: 1000px) {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 17px;
    color: #184791;
    font-family: "Rubik", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0px;
    text-transform: capitalize;
  }
`;
