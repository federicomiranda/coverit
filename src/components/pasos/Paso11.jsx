import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';

import SwissMedical from '../../assets/sm_seguros.png';

const Paso11 = () => {
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const coberturaSeleccionada = useSelector((state) => state.coberturaSeleccionada);
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);

  const [asistencia, setAsistencia] = useState(false);

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleVolver = () => {
    history.push('/10/');
  };

  const handleContinue = (tipo) => {
    if (tipo === 'credito') {
      history.push('/tarjeta-de-credito/');
    } else if (tipo === 'debito') {
      history.push('/debito-automatico/');
    }
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
                    <NombreCobertura>{coberturaSeleccionada.nombre}</NombreCobertura>
                    <SumaAsegurada>
                      <span>
                        $
                        {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                      </span>
                      suma asegurada
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
                    <LogoImg
                      src={SwissMedical}
                      alt="Swiss Medical Seguros"
                    />
                  </DetalleCuota>
                </Data>
              </Info>

              <Btns>
                <p>Forma de pago:</p>
                <BtnContinue onClick={() => { handleContinue('credito'); }}>
                  Tarjeta de Crédito
                </BtnContinue>
                <BtnContinue onClick={() => { handleContinue('debito'); }}>
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
  width: 50%;
`;

const NombreCobertura = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
`;

const SumaAsegurada = styled.p`
  color: #fff;
  font-weight: 300;
  font-size: 16px;
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
