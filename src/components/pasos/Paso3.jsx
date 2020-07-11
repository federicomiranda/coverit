import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import Select from '../Select';

const marcas = ['Marca 1', 'Marca 2', 'Marca 3'];
const modelos = ['Modelo 1', 'Modelo 2', 'Modelo 3'];
const anios = ['Año 1', 'Año 2', 'Año 3'];
const versiones = ['Versión 1', 'Versión 2', 'Versión 3'];

const Paso2 = () => {
  const vehiculo = useSelector((state) => state.vehiculo);
  const [marcaElegida, setMarcaElegida] = useState('');
  const [modeloElegido, setModeloElegido] = useState('');
  const [anioElegido, setAnioElegido] = useState('');
  const [versionElegida, setVersionElegida] = useState('');

  const elegirMarca = (value) => {
    setMarcaElegida(value);
  };

  const elegirModelo = (value) => {
    setModeloElegido(value);
  };

  const elegirAnio = (value) => {
    setAnioElegido(value);
  };

  const elegirVersion = (value) => {
    setVersionElegida(value);
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p20" />

          <Title>
            ¿Qué
            {' '}
            {vehiculo}
            {' '}
            vas a
            {' '}
            <TitleMod>asegurar</TitleMod>
            ?
          </Title>

          <Form action="#">
            <Select
              type="Marca"
              name="marca"
              options={marcas}
              elegirOpcion={elegirMarca}
            />

            <Select
              state={!!marcaElegida}
              type="Modelo"
              name="modelo"
              options={modelos}
              elegirOpcion={elegirModelo}
            />

            <Select
              state={!!modeloElegido}
              type="Año"
              name="anio"
              options={anios}
              elegirOpcion={elegirAnio}
            />

            <Select
              state={!!anioElegido}
              type="Versión"
              name="version"
              options={versiones}
              elegirOpcion={elegirVersion}
            />

            <Btns>
              <BtnBack>
                <Link to="/2/">Volver</Link>
              </BtnBack>

              <BtnContinue className={!versionElegida ? 'disabled' : ''}>
                <Link to="/4/">Continuar</Link>
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
