import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
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
  const [locElegida, setLocElegida] = useState(reduxLoc || '');
  const [localidades, setLocalidades] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLocalidades([]);
    if (cp.length >= 3) {
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
        })
        .catch((error) => console.log('error', error));
    }
  }, [cp]);

  const saveData = () => {
    dispatch(setCP(cp));
    dispatch(setLoc(locElegida));
  };

  const elegirLocalidad = (value, id) => {
    setLocElegida(value);
  };

  const handleChangeCP = (e) => {
    setCp(e.target.value);
    setLocElegida('');
    dispatch(removeCP());
    dispatch(removeLoc());
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p2" />

          <Title>
            ¿Dónde usas
            {' '}
            {vehiculo === 'auto' ? 'el' : 'la'}
            {' '}
            <TitleMod>{vehiculo}</TitleMod>
            ?
          </Title>

          <Form action="#">
            <FieldSeparator>
              <InputCP
                type="text"
                name="cp"
                id="cp"
                placeholder="Código Postal"
                onChange={handleChangeCP}
                value={cp}
              />
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

              <BtnContinue className={!locElegida ? 'disabled' : ''}>
                {/* <BtnContinue> */}
                <Link onClick={saveData} to="/3/">Continuar</Link>
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
`;

const InputCP = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
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
