import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Paso1 = () => {
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );

  const [cotId, setCotId] = useState(
    coberturaSeleccionada.id || '0418d22a-e4ae-42ff-b430-09f6cd2e9479',
  );
  const [cotizacion, setCotizacion] = useState({});
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    if (token) {
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
          setCotizacion(result);
          setLoading(false);
        })
        .catch((error) => console.log('error', error));
    }
  }, [token]);

  return (
    <>
      <Container>
        <Title>
          Inspección
          {' '}
          <TitleMod>Digital</TitleMod>
        </Title>

        {loading ? (
          <Loader
            type="Oval"
            color="#213c83"
            width={50}
            height={50}
            timeout={100000}
          />
        ) : cotizacion.status ? (
          <>
            <Content>
              <TextContent>Para iniciar la inspección digital de tu vehículo, recordá que debe ser en horario diurno.</TextContent>
              <TextContent>
                Tendrás que tomarle
                {' '}
                {cotizacion.solicitud.okm ? '1 foto' : '4 fotos'}
                . Seguí nuestras indicaciones
              </TextContent>
            </Content>

            <BtnContinue>
              <Link to="/inspeccion/">
                Empezar
              </Link>
            </BtnContinue>
          </>
        ) : (
          <Content>
            <TextContent>Ocurrió un error, por favor intente de nuevo más tarde</TextContent>
          </Content>
        )}
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
