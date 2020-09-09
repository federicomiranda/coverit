import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MotoIcon from '../MotoIcon';
import AutoIcon from '../AutoIcon';
import SolicitarAsistencia from '../SolicitarAsistencia';

const Paso7 = () => {
  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);
  const asegurar = useSelector((state) => state.asegurar);
  const coberturaSeleccionada = useSelector((state) => state.coberturaSeleccionada);

  const [asistencia, setAsistencia] = useState(false);

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <Carousel
              autoPlay={false}
              showThumbs={false}
              showStatus={false}
              dynamicHeight={false}
              showArrows
              showIndicators
              dynamicHeight
            >
              <Content>
                <Volver>
                  <Link to="/6/">Volver</Link>
                </Volver>

                <Data>
                  <span>{cliente.nombre}</span>
                  , estás por contratar 100% online
                  {' '}
                  {coberturaSeleccionada.nombre}
                  {' - '}
                  {coberturaSeleccionada.categoria}
                  {' '}
                  para tu
                  {' '}
                  {asegurar.marcaElegida}
                  {' '}
                  {asegurar.modeloElegido}
                  {' '}
                  {asegurar.anioElegido}
                </Data>

                <Text>
                  Tené a mano tu tarjeta de crédito o datos del CBU para el pago y
                  cédula azul o verde para identificar tu vehículo
                </Text>
              </Content>
              <Content>
                <Title>Inspección 100% Digital</Title>

                <Icon>
                  {vehiculo === 'auto' ? (
                    <AutoIcon color="blanco" />
                  ) : (
                    <MotoIcon color="blanco" />
                  )}
                </Icon>

                <Text>
                  Luego de la contratación, te pediremos unas fotos del auto para
                  enviarte tu póliza al instante
                </Text>

                <BtnContinue>
                  <Link to="/8/">Continuar</Link>
                </BtnContinue>
                <BtnAsistencia onClick={() => handleAsistencia(true)}>
                  Solicitar asistencia
                </BtnAsistencia>
              </Content>
            </Carousel>
          </CointainerAzul>

          {asistencia && (
          <SolicitarAsistencia handleAsistencia={handleAsistencia} />
          )}
        </>
      )}
    </>
  );
};

export default Paso7;

/*
 *
 *
 * STYLES
 *
 *
 */

const CointainerAzul = styled.div`
  min-height: calc(100vh - 100px);
  background: var(--azul);

  & li.slide {
    background: var(--azul);
  }
`;

const Content = styled.div`
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--azul);
  height: 100%;
  justify-content: center;
`;

const Volver = styled.button`
  border: none;
  background: none;
  position: absolute;
  left: 20px;
  top: 24px;

  & a {
    color: var(--verde);
    font-size: 16px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #fff;
  margin: 48px 0 32px;
  text-align: center;
`;

const Data = styled.p`
  color: #fff;
  font-size: 20px;
  text-align: center;
  width: 80%;
  margin: 48px auto 32px;
  font-weight: 300;
  line-height: 1.3;

  & span {
    color: var(--verde);
  }
`;

const Text = styled.p`
  color: #fff;
  font-size: 16px;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  line-height: 1.3;
  font-weight: 300;
  margin-bottom: 24px;
`;

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;
  text-align: center;
  margin-top: 12px;
  border: 2px solid var(--verde);
  margin-bottom: 8px;
  display: block;
  width: 100%;

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const BtnAsistencia = styled.button`
  color: var(--verde);
  border: none;
  border: 2px solid var(--verde);
  padding: 10px 20px;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 32px;
  background: none;
`;

const Icon = styled.li`
  width: 130px;
  height: 130px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin: 0 auto 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
