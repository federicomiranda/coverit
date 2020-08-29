import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import ProgressBar from '../ProgressBar';
import Select from '../Select';
import {
  setCP, setLoc, removeCP, removeLoc,
} from '../../actions';

const Paso2 = () => {
  const dispatch = useDispatch();

  const vehiculo = useSelector((state) => state.vehiculo);
  const reduxCP = useSelector((state) => state.cp);
  const reduxLoc = useSelector((state) => state.loc);
  const token = useSelector((state) => state.token);
  const [cp, setCp] = useState(reduxCP || '');
  const [locElegida, setLocElegida] = useState(reduxLoc.locElegida || '');
  const [idLocElegida, setIdLocElegida] = useState(null);
  const [localidades, setLocalidades] = useState([]);

  const [loader, setLoader] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLocalidades([]);
    if (cp.length === 4) {
      setLoader(true);
      fetch(`${BASE_URL}/localidades?codigo_postal=${cp}`, {
        method: 'POST',
        headers: {
          Authorization:
          `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          setLocalidades(result);
          setLoader(false);
        })
        .catch((error) => console.log('error', error));
    }
  }, [cp]);

  useEffect(() => {
    if (localidades.length === 1) {
      setLocElegida(localidades[0].name);
      setIdLocElegida(localidades[0].id);
      document.getElementById('btnContinue').focus();
    }
  }, [localidades]);

  const saveData = () => {
    dispatch(setCP(cp));
    dispatch(setLoc({ idLocElegida, locElegida }));
  };

  const elegirLocalidad = (value, id) => {
    setLocElegida(value);
    setIdLocElegida(id);
  };

  const handleChangeCP = (e) => {
    setCp(e.target.value);
    setLocElegida('');
    dispatch(removeCP());
    dispatch(removeLoc());
  };

  const stopSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p2" value="2 de 6" />

          <Title>
            ¿Dónde usas
            {' '}
            {vehiculo === 'auto' ? 'el' : 'la'}
            {' '}
            <TitleMod>{vehiculo}</TitleMod>
            ?
          </Title>

          <Form onSubmit={stopSubmit}>
            <FieldSeparator>
              <InputCP
                type="text"
                name="cp"
                id="cp"
                placeholder="Código Postal"
                onChange={handleChangeCP}
                value={cp}
                minLength="4"
                maxLength="4"
                inputMode="numeric"
              />
              {loader ? (
                <LoaderContainer>
                  <Loader
                    type="ThreeDots"
                    color="#8dccc3"
                    width={35}
                    height={20}
                    timeout={10000}
                  />
                </LoaderContainer>
              ) : (
                ''
              )}
              <LabelCP htmlFor="cp">
                Si no conoces tu código postal, buscalo
                {' '}
                <AnchorCP href="/">aquí</AnchorCP>
              </LabelCP>
            </FieldSeparator>

            <Select
              state={!(!cp || cp.length < 3)}
              type="Localidades"
              name="localidades"
              options={localidades || []}
              elegirOpcion={elegirLocalidad}
              selectedValue={locElegida}
            />

            <Disclaimer>
              Coberturas previstas solo para vehículos particulares
            </Disclaimer>

            <Btns>
              <BtnBack>
                <Link to="/">Volver</Link>
              </BtnBack>

              <BtnContinue id="btnContinue" className={!locElegida ? 'disabled' : ''}>
                <Link onClick={saveData} to="/3/">
                  Continuar
                </Link>
              </BtnContinue>
            </Btns>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Paso2;

/*
 *
 *
 * STYLES
 *
 *
 */

const Container = styled.div`
  padding: 30px 15px;
`;

const Title = styled.p`
  margin-top: 92px;
  margin-bottom: 102px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: var(--verde);
`;

const Form = styled.form`
  width: 90%;
  margin: auto;
`;

const FieldSeparator = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const InputCP = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
`;

const LoaderContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 6px;
`;

const LabelCP = styled.label`
  font-size: 16px;
  color: var(--gris);
  margin-top: 10px;
  display: inline-block;
`;

const AnchorCP = styled.a`
  color: var(--azul);
`;

const Disclaimer = styled.p`
  color: var(--azul);
  font-size: 14px;
  width: 60%;
  margin: 64px auto 24px;
  text-align: center;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  
  & a {
    color: var(--verde);
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;

  &.disabled {
    background: var(--verde-disabled);
  }

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }

  &.disabled a {
    pointer-events: none;
  }
`;
