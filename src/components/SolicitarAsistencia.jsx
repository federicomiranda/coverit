import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SolicitarAsistencia = ({ handleAsistencia }) => {
  const cliente = useSelector((state) => state.cliente);
  const solicitud = useSelector((state) => state.solicitud);
  const token = useSelector((state) => state.token);
  const [asistenciaMsg, setAsistenciaMsg] = useState('');

  const BASE_URL = process.env.REACT_APP_API_URL;

  const solicitarAsistencia = () => {
    fetch(
      `${BASE_URL}/solicitar-asistencia?solicitud_id=${solicitud.solicitud.id}&celular=+549${cliente.tel}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
      },
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status) {
          setAsistenciaMsg('La solicitud se realizó correctamente');
        } else {
          setAsistenciaMsg('Hubo un error al realizar la solicitud');
        }
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <AsistenciaContainer>
      <AsistenciaContenido>
        <CerrarAsistencia>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => handleAsistencia(false)}
          />
        </CerrarAsistencia>
        <AsistenciaTitle>Solicitar asistencia</AsistenciaTitle>
        <AsistenciaText>Solicita asistencia telefónica para cotizar tu vehículo</AsistenciaText>
        <AsistenciaInput type="number" name="tel" value={cliente.tel} />
        <AsistenciaBtn onClick={solicitarAsistencia}>
          Confirmar teléfono
        </AsistenciaBtn>
        {asistenciaMsg && <AsistenciaMsg>{asistenciaMsg}</AsistenciaMsg>}
      </AsistenciaContenido>
    </AsistenciaContainer>
  );
};

export default SolicitarAsistencia;

/*
 *
 *
 * STYLES
 *
 *
 */

const AsistenciaContainer = styled.div`
   position: fixed;
   left: 0;
   top: -100px;
   width: 100%;
   height: 100vh;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
 `;

const AsistenciaContenido = styled.div`
   background: #fff;
   padding: 32px;
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 80%;
 `;

const CerrarAsistencia = styled.span`
   position: absolute;
   right: 10px;
   top: 10px;
   width: 30px;
   height: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: var(--verde);
   border: 2px solid var(--verde);
   border-radius: 50%;
 `;

const AsistenciaTitle = styled.p`
   font-size: 20px;
   color: var(--verde);
   margin-bottom: 12px;
   text-transform: uppercase;
 `;

const AsistenciaText = styled.p`
  text-align: center;
  color: var(--gris);
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 300;
`;

const AsistenciaInput = styled.input`
   display: block;
   width: 100%;
   font-size: 18px;
   color: var(--gris);
   padding: 5px;
   border: 1px solid var(--verde);
   margin-bottom: 12px;
 `;

const AsistenciaBtn = styled.div`
   background: var(--verde);
   border: none;
   padding: 8px 20px;
   color: #fff;
   font-size: 16px;
   text-transform: uppercase;
   display: block;
   width: 100%;
   text-align: center;
 `;

const AsistenciaMsg = styled.p`
   text-align: center;
   font-size: 14px;
   width: 100%;
   margin-top: 12px;
 `;
