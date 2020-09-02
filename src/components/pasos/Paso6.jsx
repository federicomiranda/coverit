import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';
import ProgressBar from '../ProgressBar';
import SolicitarAsistencia from '../SolicitarAsistencia';
import { setCoberturaSeleccionada } from '../../actions';

import SwissMedical from '../../assets/sm_seguros.png';

const Paso6 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);
  const asegurar = useSelector((state) => state.asegurar);
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);
  const cp = useSelector((state) => state.cp);
  const solicitud = useSelector((state) => state.solicitud);
  const coberturas = useSelector((state) => state.coberturas);

  const [cots, setCots] = useState([]);
  const [detalle, setDetalle] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [coberturaElegida, setCoberturaElegida] = useState(null);
  const [
    coberturaElegidaDescripcion,
    setCoberturaElegidaDescripcion,
  ] = useState(null);
  const [
    franquicia,
    setFranquicia,
  ] = useState(null);

  useEffect(() => {
    setCots(solicitud.solicitud.cotizaciones);
  }, []);

  const handleDetalle = (value) => {
    setDetalle(!detalle);
    if (!coberturaElegida) {
      setCoberturaElegida(value.nombre);
      setCoberturaElegidaDescripcion(value.descripcion);
      setFranquicia(value.franquicia);
    } else {
      setCoberturaElegida(null);
      setCoberturaElegidaDescripcion(null);
      setFranquicia(null);
    }
  };

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleContratacion = () => {
    const slides = document.querySelectorAll('#cotizaciones_container li.slide');

    let indice = 0;
    const arr_coberturas = [];

    slides.forEach((element, index) => {
      if (element.classList.contains('selected')) {
        if (index === 1 || index === 11) {
          indice = 0;
        } else if (index === 0 || index === 10) {
          indice = 9;
        } else {
          indice = index - 1;
        }

        cots.map((cotizacion) => {
          for (let i = 0; i < coberturas.length; i++) {
            if (i == cotizacion.categoria_cobertura) {
              arr_coberturas.push({
                id: cotizacion.id,
                nombre: coberturas[i].nombre,
                descripcion: coberturas[i].descripcion,
                cuota: cotizacion.cuota,
              });
            }
          }
        });

        arr_coberturas.forEach((element, index) => {
          if (index === indice) {
            dispatch(setCoberturaSeleccionada(element));
            history.push('/7/');
          }
        });
      }
    });
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          {cots && (
            <>
              <ProgressBar percentaje="p6" value="6 de 6" />

              {!detalle ? (
                <>
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
                      {' '}
                      {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                    </SumaAseguradaValue>
                    <SumaAseguradaText>Suma asegurada</SumaAseguradaText>

                    {cots.length > 0 && (
                      <SumaAseguradaImg
                        src={SwissMedical}
                        alt="Swiss Medical Seguros"
                      />
                    )}
                  </SumaAseguradaContainer>

                  <CotizacionesContainer id="cotizaciones_container">
                    {cots.length > 0 ? (
                      <>
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
                            let cobertura = null;

                            for (let i = 0; i < coberturas.length; i++) {
                              if (i == cotizacion.categoria_cobertura) {
                                cobertura = {
                                  nombre: coberturas[i].nombre,
                                  descripcion: coberturas[i].descripcion,
                                  franquicia: cotizacion.franquicia,
                                };
                              }
                            }

                            return (
                              <CotizacionesItem
                                key={cotizacion.id}
                                id={cotizacion.id}
                              >
                                <CotizacionesItemCobertura>
                                  {cobertura.nombre}
                                </CotizacionesItemCobertura>
                                <CotizacionesItemVerDetalle
                                  onClick={() => handleDetalle(cobertura)}
                                >
                                  ver detalle
                                </CotizacionesItemVerDetalle>
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
                        <BtnContinue onClick={handleContratacion}>
                          Ir a contratación online
                        </BtnContinue>
                        <BtnAsistencia onClick={() => handleAsistencia(true)}>
                          Solicitar asistencia
                        </BtnAsistencia>
                      </>
                    ) : (
                      <>
                        <NoTenemos>
                          Actualmente no tenemos propuestas disponibles para tu
                          cobertura...
                        </NoTenemos>
                        <BtnAsistencia onClick={() => handleAsistencia(true)}>
                          Solicitar asistencia
                        </BtnAsistencia>
                      </>
                    )}
                  </CotizacionesContainer>

                  {asistencia && (
                    <SolicitarAsistencia handleAsistencia={handleAsistencia} />
                  )}
                </>
              ) : (
                <DetalleContainer>
                  <DetalleHeader>
                    <DetalleVolver>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => handleDetalle(null)}
                      />
                    </DetalleVolver>
                    {}
                    <DetalleImg
                      src={SwissMedical}
                      alt="Swiss Medical Seguros"
                    />
                  </DetalleHeader>
                  <DetalleCobertura>
                    <CoberturaElegida>{coberturaElegida}</CoberturaElegida>
                    <div>
                      <DetalleSumaAsegurada>
                        $
                        {' '}
                        {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                      </DetalleSumaAsegurada>
                      <DetalleSumaAseguradaText>
                        Suma asegurada
                      </DetalleSumaAseguradaText>
                    </div>
                  </DetalleCobertura>
                  {franquicia ? (
                    <Franquicia>
                      Franquicia: $
                      {franquicia}
                    </Franquicia>
                  ) : null}
                  <DetalleDescripcion>
                    {parse(coberturaElegidaDescripcion)}
                  </DetalleDescripcion>
                  <BtnContinue>
                    <Link to="/7/">Ir a contratación online</Link>
                  </BtnContinue>
                </DetalleContainer>
              )}
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
    height: 10px;
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
`;

const CotizacionesItemVerDetalle = styled.p`
  color: var(--gris);
  font-size: 12px;
  font-weight: 300;
  margin: 5px 0;
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

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;
  text-align: center;
  margin-top: 12px;
  border: 2px solid var(--verde);
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;

  & a {
    color: #fff;
  }
`;

const BtnAsistencia = styled.button`
  color: var(--verde);
  border: none;
  border: 2px solid var(--verde);
  padding: 10px 20px;
  text-align: center;
  margin-top: 10px;
  background: #fff;
  font-size: 16px;
  text-transform: uppercase;
  width: 100%;
`;

const DetalleContainer = styled.div`
  display: block;
  width: 100%;
  border: 1px solid var(--verde);
  border-radius: 30px;
  position: relative;
  margin-top: 24px;
  padding: 24px;
`;

const DetalleHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const DetalleVolver = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--verde);
  border: 2px solid var(--verde);
  border-radius: 50%;

  & svg {
    color: #fff;
  }
`;

const DetalleImg = styled.img`
  width: 100px;
`;

const DetalleCobertura = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CoberturaElegida = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: var(--azul);
  text-transform: uppercase;
`;

const DetalleSumaAsegurada = styled.p`
  color: var(--azul);
  text-align: center;
  font-weight: 300;
  font-size: 20px;
`;

const DetalleSumaAseguradaText = styled.p`
  color: var(--azul);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 11px;
  text-align: center;
`;

const DetalleDescripcion = styled.p`
  font-size: 14px;
  color: var(--azul);
  height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--azul);
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background: #e1efef;
    border-radius: 20px;
  }
`;

const NoTenemos = styled.p`
  text-align: center;
  margin-bottom: 24px;
  font-size: 18px;
  color: var(--azul);
`;

const Franquicia = styled.p`
  color:var(--azul);
  font-weight:600;
  text-align: center;
  margin: 0 0 10px;
`;
