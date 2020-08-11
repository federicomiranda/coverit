import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';
import { setDataVehiculo } from '../../actions';

const Paso8 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const asegurar = useSelector((state) => state.asegurar);

  const [asistencia, setAsistencia] = useState(false);
  const [patente, setPatente] = useState('');
  const [chasis, setChasis] = useState('');
  const [motor, setMotor] = useState('');

  const handleChangePatente = (e) => {
    setPatente(e.target.value);
  };

  const handleChangeChasis = (e) => {
    setChasis(e.target.value);
  };

  const handleChangeMotor = (e) => {
    setMotor(e.target.value);
  };

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleVolver = () => {
    history.push('/7/');
  };

  const stopSubmit = (e) => {
    e.preventDefault();
  };

  const handleContinue = () => {
    dispatch(setDataVehiculo({ patente, chasis, motor }));
    history.push('/9/');
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <>
              <ProgressBar percentaje="p1" value="1 de 6" />

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

                <div>
                  <Marca>
                    {asegurar.marcaElegida}
                    {' '}
                    {asegurar.anioElegido}
                  </Marca>
                  <Modelo>
                    {asegurar.modeloElegido}
                    {' '}
                    {asegurar.versionElegida}
                  </Modelo>
                </div>
              </Info>

              <Form onSubmit={stopSubmit}>
                <FieldSeparator>
                  <Input
                    type="text"
                    name="patente"
                    id="patente"
                    placeholder="Patente"
                    onChange={handleChangePatente}
                    value={patente}
                  />
                </FieldSeparator>

                <FieldSeparator>
                  <Input
                    type="text"
                    name="chasis"
                    id="chasis"
                    placeholder="Chasis"
                    onChange={handleChangeChasis}
                    value={chasis}
                  />
                </FieldSeparator>

                <FieldSeparator>
                  <Input
                    type="text"
                    name="motor"
                    id="motor"
                    placeholder="Motor"
                    onChange={handleChangeMotor}
                    value={motor}
                  />
                </FieldSeparator>
              </Form>

              <BtnContinue onClick={handleContinue}>Continuar</BtnContinue>
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

export default Paso8;

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

const Marca = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
  text-align: right;
  text-transform: justify;
`;

const Modelo = styled.p`
  font-size: 18px;
  color: #fff;
  font-weight: 400;
  text-align: right;
  text-transform: justify;
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

const Form = styled.form`
  margin: 32px 0 0;
  display: flex;
  flex-direction: column;
`;

const FieldSeparator = styled.div`
  margin-bottom: 24px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: #fff;
  padding: 10px 5px;
  border: 1px solid #fff;
  background: none;
  font-weight: 300;
  outline: none;

  &::placeholder {
    color: rgba(255,255,255, 0.3);
    opacity: 1;
    font-weight: 300;
  }

  &:-ms-input-placeholder {
    color: rgba(255,255,255, 0.3);
    font-weight: 300;
  }

  &::-ms-input-placeholder {
    color: rgba(255,255,255, 0.3);
    font-weight: 300;
  }
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
