import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Paso1 = () => {
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );

  const [cotId, setCotId] = useState(
    coberturaSeleccionada.id || '73909b5b-eb42-4c6a-9ce7-b3d03afdeec1',
  );

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/cotizacion?cotizacion_id=${cotId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <Container>
        <Title>
          Inspección
          {' '}
          <TitleMod>Digital</TitleMod>
        </Title>

        <Content>
          <TextContent>Para iniciar la inspección digital de tu vehículo, recordá que debe ser en horario diurno.</TextContent>
          <TextContent>Tednrás que tomarle x fotos. Seguí nuestras indicaciones</TextContent>
        </Content>

        <BtnContinue>
          <Link to="/inspeccion/">
            Empezar
          </Link>
        </BtnContinue>
      </Container>
    </>
  );
};

export default Paso1;

/*
 *
 *
 * STYLES
 *
 *
*/

const Container = styled.div`
  padding: 30px 15px;
  background: var(--verde);
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  margin-bottom: 32px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: #fff;
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const TextContent = styled.p`
  color: #fff;
  font-weight: 300;
  line-height: 1.3;
  margin-bottom: 20px;
`;

const BtnContinue = styled.div`
  background: var(--azul);
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: block;
  width: 100%;

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }
`;
