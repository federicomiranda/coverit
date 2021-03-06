import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { setInspeccionData } from '../../actions';

const Inspeccion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, prev } = useParams();
  const [cotizacion, setCotizacion] = useState({});
  const [loading, setLoading] = useState(false);
  const [emitir, setEmitir] = useState(false);

  useEffect(() => {
    if (prev) {
      setEmitir(true);
    } else {
      setEmitir(false);
    }
  }, []);

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    if (token) {
      fetch(`${BASE_URL}/cotizacion?cotizacion_id=${id}`, {
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

  useEffect(() => {
    dispatch(
      setInspeccionData({
        id,
        cotizacion,
        emitir,
      }),
    );
  }, [cotizacion]);

  const handleClickStart = () => {
    history.push(`/inspeccion/fotos/${id}`);
  };

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
                {cotizacion.solicitud.okm ? '1 foto' : '6 fotos'}
                . Seguí nuestras indicaciones
              </TextContent>
            </Content>

            <BtnContinue onClick={handleClickStart}>
              Empezar
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

export default Inspeccion;

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
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
`;
