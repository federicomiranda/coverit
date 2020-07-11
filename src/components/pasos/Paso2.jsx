import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import Select from '../Select';

const localidades = [
  'Localidad 1',
  'Localidad 2',
  'Localidad 3',
];

const Paso2 = () => {
  const vehiculo = useSelector((state) => state.vehiculo);
  const [cp, setCp] = useState('');
  const [locElegida, setLocElegida] = useState('');

  const elegirLocalidad = (value) => {
    setLocElegida(value);
  };

  const handleChangeCP = (e) => {
    setCp(e.target.value);
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p20" />

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
              options={localidades}
              elegirOpcion={elegirLocalidad}
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
                <Link to="/3/">Continuar</Link>
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
