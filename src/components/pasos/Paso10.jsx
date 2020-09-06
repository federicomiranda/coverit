import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';
import { addClientDirection } from '../../actions';

const Paso10 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const loc = useSelector((state) => state.loc);
  const cp = useSelector((state) => state.cp);

  const [asistencia, setAsistencia] = useState(false);

  const [calle, setCalle] = useState('');
  const [nro, setNro] = useState('');
  const [piso, setPiso] = useState('');
  const [depto, setDepto] = useState('');

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleVolver = () => {
    history.push('/9/');
  };

  const stopSubmit = (e) => {
    e.preventDefault();
  };

  const handleCalle = (e) => {
    setCalle(e.target.value);
  };

  const handleNro = (e) => {
    setNro(e.target.value);
  };

  const handlePiso = (e) => {
    setPiso(e.target.value);
  };

  const handleDepto = (e) => {
    setDepto(e.target.value);
  };

  const handleContinue = () => {
    dispatch(addClientDirection({
      calle,
      nro,
      piso,
      depto,
    }));

    history.push('/11/');
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <>
              <ProgressBar percentaje="p3" value="3 de 6" />

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

                <DataCliente>
                  <Domicilio>Domicilio de uso:</Domicilio>
                  <Localidad>{loc.locElegida}</Localidad>
                  <CodigoPostal>
                    (CP
                    {cp}
                    )
                  </CodigoPostal>
                </DataCliente>
              </Info>

              <Form onSubmit={stopSubmit}>
                <p>Domicilio de contratación</p>
                <FieldSeparator>
                  <Input
                    type="text"
                    name="calle"
                    placeholder="Calle"
                    onChange={handleCalle}
                  />
                  <Input
                    type="number"
                    name="nro"
                    placeholder="Nro"
                    onChange={handleNro}
                  />
                  <Input
                    type="text"
                    name="piso"
                    placeholder="Piso"
                    onChange={handlePiso}
                  />
                  <Input
                    type="text"
                    name="departamento"
                    placeholder="Departamento"
                    onChange={handleDepto}
                  />
                </FieldSeparator>
              </Form>

              <BtnContinue
                className={
                  calle
                  && nro
                    ? ''
                    : 'disabled'
                }
                onClick={handleContinue}
              >
                Continuar
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

export default Paso10;

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

const DataCliente = styled.div`
  width: 65%;
  text-align: right;
  color: #fff;
  font-weight: 300;
  font-size: 16px;
`;

const Domicilio = styled.p`
  color: var(--verde);
  font-size: 14px;
`;

const Localidad = styled.p`
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  font-size: 18px;
`;

const CodigoPostal = styled.p`
  font-weight: 400;
  text-transform: uppercase;
  color: #fff;
  font-size: 18px;
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

  & > p {
    color: var(--verde);
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const FieldSeparator = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
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

  &:first-of-type {
    width: 60%;
    margin-bottom: 24px;
  }

  &:nth-of-type(2) {
    width: calc(40% - 10px);
    margin-left: 10px;
    margin-bottom: 24px;
  }

  &:nth-of-type(3) {
    width: 50%;
  }

  &:last-of-type {
    width: calc(50% - 10px);
    margin-left: 10px;
  }

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

  &.disabled {
    background: var(--verde-disabled);
    border: 2px solid var(--verde-disabled);
    pointer-events: none;
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
