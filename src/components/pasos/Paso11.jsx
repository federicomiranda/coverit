import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import moment from 'moment';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';

import SwissMedical from '../../assets/sm_seguros.png';
import 'react-calendar/dist/Calendar.css';

import { setVigencia } from '../../actions';

const Paso11 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);

  const [asistencia, setAsistencia] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [calendar, setCalendar] = useState(false);
  const [future, setFuture] = useState(new Date());

  useEffect(() => {
    const limitDate = new Date().setDate(future.getDate() + 30);
    setFuture(new Date(limitDate));
  }, []);

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleVolver = () => {
    history.push('/10/');
  };

  const handleContinue = (tipo) => {
    dispatch(setVigencia(date));
    if (tipo === 'credito') {
      history.push('/tarjeta-de-credito/');
    } else if (tipo === 'debito') {
      history.push('/debito-automatico/');
    }
  };

  const dateChange = (value) => {
    setDate(moment(value).format('YYYY-MM-DD'));
    setCalendar(false);
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <>
              <ProgressBar percentaje="p4" value="4 de 6" />

              <Title>
                Contratación
                {' '}
                <TitleMod>online</TitleMod>
              </Title>

              <Info>
                <Volver>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={handleVolver}
                  />
                </Volver>

                <Data>
                  <Cobertura>
                    <NombreCobertura>
                      COBERTURA
                      {' '}
                      {coberturaSeleccionada.categoria}
                      <span>
                        (
                        {coberturaSeleccionada.nombre}
                        )
                      </span>
                    </NombreCobertura>
                    <SumaAsegurada>
                      <span>
                        $
                        {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                      </span>
                      <p>suma asegurada</p>
                    </SumaAsegurada>
                  </Cobertura>

                  <DetalleCuota>
                    <ValorCuota>
                      $
                      {coberturaSeleccionada.cuota}
                    </ValorCuota>
                    <Mensual>
                      Valor cuota
                      {' '}
                      <span>(mensual)</span>
                    </Mensual>
                    <Descuento>
                      <p>
                        $
                        {(coberturaSeleccionada.cuota * 1.35).toFixed(2)}
                      </p>
                      <span>35% OFF</span>
                    </Descuento>
                    <LogoImg src={SwissMedical} alt="Swiss Medical Seguros" />
                  </DetalleCuota>
                </Data>

                <VigenciaContainer>
                  <Label>Vigencia desde:</Label>
                  <InputContainer
                    onClick={() => {
                      setCalendar(true);
                    }}
                  >
                    <Input type="text" readOnly id="fecha" value={date} />
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputContainer>
                </VigenciaContainer>
                {calendar && (
                  <Calendar
                    className="vigenciaCalendar"
                    onChange={dateChange}
                    value={new Date()}
                    minDate={new Date()}
                    maxDate={future}
                  />
                )}
              </Info>

              <Btns>
                <p>Forma de pago:</p>
                <BtnContinue
                  onClick={() => {
                    handleContinue('credito');
                  }}
                >
                  Tarjeta de Crédito
                </BtnContinue>
                <BtnContinue
                  onClick={() => {
                    handleContinue('debito');
                  }}
                >
                  Débito automático
                </BtnContinue>
              </Btns>

              <BtnAsistencia onClick={() => handleAsistencia(true)}>
                Solicitar asistencia
              </BtnAsistencia>
            </>
          </CointainerAzul>

          {asistencia && (
            <SolicitarAsistencia handleAsistencia={handleAsistencia} />
          )}
        </>
      )}
    </>
  );
};

export default Paso11;

/*
 *
 *
 * STYLES
 *
 *
 */

const CointainerAzul = styled.div`
  min-height: calc(100vh - 100px);
  padding: 30px 15px;
  background: var(--azul);
  position: relative;

  & li.slide {
    background: var(--azul);
  }
`;

const Title = styled.p`
  margin: 32px 0;
  font-weight: 300;
  color: var(--verde);
  text-align: center;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: #fff;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  & .vigenciaCalendar {
    position: absolute;
    left: calc(50% - 175px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    z-index: 10;
    width: 350px;
  }
`;

const VigenciaContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 18px;
  flex: 1;
  margin-right: 12px;
`;

const InputContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  & svg {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  color: #fff;
  padding: 10px;
  font-weight: 300;
  outline: none;
  background: var(--verde);
  border: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    opacity: 1;
    font-weight: 300;
  }

  &:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-weight: 300;
  }

  &::-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-weight: 300;
  }
`;

const Data = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Volver = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--verde);
  border: 2px solid var(--verde);
  border-radius: 50%;
  position: absolute;

  & svg {
    color: #fff;
  }
`;

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;
  text-align: center;
  border: 2px solid var(--verde);
  display: block;
  width: 48%;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
`;

const BtnAsistencia = styled.button`
  color: var(--verde);
  border: none;
  border: 2px solid var(--verde);
  padding: 10px 20px;
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 32px;
  background: none;
`;

const Cobertura = styled.div`
  width: 45%;
`;

const NombreCobertura = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase; 

  & span {
    display: block;
    font-weight: 400;
  }
`;

const SumaAsegurada = styled.p`
  color: #fff;
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
`;

const DetalleCuota = styled.div`
  width: 50%;
  text-align: center;
  padding: 10px;
  border: 1px solid var(--verde);
  border-radius: 20px;
`;

const ValorCuota = styled.span`
  color: var(--verde);
  font-weight: 300;
  font-size: 24px;
`;

const Mensual = styled.p`
  font-size: 14px;
  color: var(--verde);
  font-weight: 500;
  margin: 5px 0;

  & span {
    font-weight: 300;
    text-transform: uppercase;
    font-size: 12px;
  }
`;

const Descuento = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    text-decoration: line-through;
    color: var(--verde);
    font-weight: 500;
  }

  & span {
    background: var(--verde);
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 5px;
    color: #fff;
    font-weight: 500;
  }
`;

const LogoImg = styled.img`
  width: 70%;
  margin-top: 18px;
`;

const Btns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & p {
    font-weight: 300;
    color: var(--verde);
    font-size: 14px;
    width: 100%;
    margin-bottom: 12px;
  }
`;
