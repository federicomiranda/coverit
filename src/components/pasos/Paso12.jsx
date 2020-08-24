import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';

import SwissMedical from '../../assets/sm_seguros.png';

const Credito = () => {
  const vehiculo = useSelector((state) => state.vehiculo);
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );
  const cliente = useSelector((state) => state.cliente);

  const [asistencia, setAsistencia] = useState(false);

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleContinue = () => {

  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <>
              <ProgressBar percentaje="p6" value="6 de 6" />

              <Title>
                {cliente.nombre}
                {', '}
                <TitleMod>bienvenido a Coverit!</TitleMod>
              </Title>

              <Text>
                Te enviamos por correo electrónico tu cobertura de
                Responsabilidad Civil provisoria.
              </Text>

              <Text>
                Para obtener la cobertura seleccionada, ir a Inspección Digital.
              </Text>

              <CoberturaContainer>
                <LogoImg src={SwissMedical} alt="Swiss Medical Seguros" />

                <Cobertura>
                  <CoberturaNombre>{coberturaSeleccionada.nombre}</CoberturaNombre>
                  <CoberturaBtnInfo>+ info</CoberturaBtnInfo>
                </Cobertura>
              </CoberturaContainer>

              <BtnContinue onClick={handleContinue}>
                <FontAwesomeIcon icon={faCamera} />
                Ir a inspección digital
              </BtnContinue>
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

export default Credito;

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
  text-align: left;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: #fff;
  display: block;
`;

const Text = styled.p`
  color: #fff;
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 16px;
  font-weight: 300;
`;

const CoberturaContainer = styled.div`
  margin: 0 0 24px;
  border: 1px solid var(--gris);
  padding: 10px 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Cobertura = styled.div`
  text-align: center;
`;

const CoberturaNombre = styled.p`
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 5px;
`;

const CoberturaBtnInfo = styled.button`
  border: none;
  background: #909ec2;
  color: #fff;
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;
  text-align: center;
  border: 2px solid var(--verde);
  display: block;
  width: 100%;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;

  & svg {
    margin-right: 10px;
  }
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

const LogoImg = styled.img`
  width: 40%;
`;
