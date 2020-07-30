import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProgressBar from '../ProgressBar';
import { setSA } from '../../actions';

import SwissMedical from '../../assets/sm_seguros.png';

const Paso6 = () => {
  const dispatch = useDispatch();

  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);
  const asegurar = useSelector((state) => state.asegurar);
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);
  const cp = useSelector((state) => state.cp);
  const solicitud = useSelector((state) => state.solicitud);
  const coberturas = useSelector((state) => state.coberturas);

  const [cots, setCots] = useState([]);

  useEffect(() => {
    setCots(solicitud.solicitud.cotizaciones);
  }, []);

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          {cots && (
            <>
              <ProgressBar percentaje="p6" value="6 de 6" />

              <Title>
                <TitleMod>{cliente.nombre}</TitleMod>
                {', '}
                estas son las mejores propuestas para tu cobertura.
              </Title>

              <DataList>
                <DataListItem>{asegurar.marcaElegida}</DataListItem>
                <DataListItem>{asegurar.modeloElegido}</DataListItem>
                <DataListItem>{asegurar.anioElegido}</DataListItem>
                <DataListItem>
                  CP
                  {cp}
                </DataListItem>
              </DataList>

              <SumaAseguradaContainer>
                <SumaAseguradaValue>
                  $
                  {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                </SumaAseguradaValue>
                <SumaAseguradaText>Suma asegurada</SumaAseguradaText>
                <SumaAseguradaImg
                  src={SwissMedical}
                  alt="Swiss Medical Seguros"
                />
              </SumaAseguradaContainer>

              <CotizacionesContainer>
                <Carousel
                  autoPlay={false}
                  showThumbs={false}
                  showStatus={false}
                  dynamicHeight={false}
                  showArrows={cots.length > 1}
                  showIndicators={cots.length > 1}
                  infiniteLoop
                >
                  {cots.map((cotizacion) => {
                    let cobertura;

                    switch (cotizacion.categoria_cobertura) {
                      case '1':
                        cobertura = coberturas[0];
                        break;
                      case '2':
                        cobertura = coberturas[1];
                        break;
                      case '3':
                        cobertura = coberturas[2];
                        break;
                      case '4':
                        cobertura = coberturas[3];
                        break;
                      default:
                        cobertura = null;
                    }

                    return (
                      <CotizacionesItem key={cotizacion.id} id={cotizacion.id}>
                        <CotizacionesItemCobertura>
                          {cobertura}
                        </CotizacionesItemCobertura>
                        <CotizacionesItemCuota>
                          $
                          {' '}
                          <span>{cotizacion.cuota}</span>
                        </CotizacionesItemCuota>
                        <CotizacionesItemAclaracionCuota>
                          Valor cuota
                          {' '}
                          <span>(Mensual)</span>
                        </CotizacionesItemAclaracionCuota>
                        <CotizacionesItemDescuentoContainer>
                          <CotizacionesItemDescuentoTachado>
                            $
                            {(cotizacion.cuota * 1.35).toFixed(2)}
                          </CotizacionesItemDescuentoTachado>
                          <CotizacionesItemDescuentoOff>
                            35% OFF
                          </CotizacionesItemDescuentoOff>
                        </CotizacionesItemDescuentoContainer>
                      </CotizacionesItem>
                    );
                  })}
                </Carousel>
              </CotizacionesContainer>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Paso6;

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
  margin-top: 24px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 20px;
`;

const TitleMod = styled.span`
  color: var(--verde);
`;

const DataList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const DataListItem = styled.li`
  flex: 1;
  margin: 0 5px;
  padding: 10px 5px;
  border: 1px solid var(--azul);
  text-transform: uppercase;
  color: var(--azul);
  text-align: center;
  border-radius: 5px;
`;

const SumaAseguradaContainer = styled.div`
  padding: 16px 0;
  text-align: center;
`;

const SumaAseguradaValue = styled.p`
  color: var(--verde);
  font-size: 20px;
  font-weight: 300;
`;

const SumaAseguradaText = styled.p`
  color: var(--verde);
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 24px;
`;

const SumaAseguradaImg = styled.img`
  width: 100px;
`;

const CotizacionesContainer = styled.div`
  min-height: 200px;

  & .control-dots .dot {
    opacity: 1;
    border: 1px solid var(--verde);
    background: none;
    box-shadow: none;
    width: 10px;
    height: 10px
  }

  & .control-dots .dot.selected {
    background: var(--verde);
  }

  & .control-arrow,
  .carousel.carousel-slider .control-arrow {
    opacity: 1;
    padding: 0;
    background: var(--verde);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(50% - 15px);
  }
`;

const CotizacionesItem = styled.div`
  min-height: 200px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CotizacionesItemCobertura = styled.p`
  color: var(--azul);
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 12px;
`;

const CotizacionesItemCuota = styled.p`
  color: var(--verde);
  font-weight: 300;
  font-size: 24px;

  & span {
    font-weight: 500;
    font-size: 28px;
  }
`;

const CotizacionesItemAclaracionCuota = styled.p`
  color: var(--azul);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
  margin: 5px 0;

  & span {
    font-weight: 300;
  }
`;

const CotizacionesItemDescuentoContainer = styled.div`
  display: flex;
`;

const CotizacionesItemDescuentoTachado = styled.p`
  color: var(--verde);
  margin-right: 12px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: line-through;
`;

const CotizacionesItemDescuentoOff = styled.p`
  background: var(--verde);
  color: #fff;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 10px;
  font-weight: 400;
`;
