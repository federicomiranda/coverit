import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import ProgressBar from '../ProgressBar';
import Select from '../Select';

import SwissMedical from '../../assets/sm_seguros.png';

const Credito = () => {
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );
  const cliente = useSelector(
    (state) => state.cliente,
  );
  const dataVehiculo = useSelector(
    (state) => state.dataVehiculo,
  );
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);

  const [asistencia, setAsistencia] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nroTarjeta, setNroTarjeta] = useState('');
  const [formasPagos, setFormasPagos] = useState([]);

  const [formaPagoElegida, setFormaPagoElegida] = useState('');
  const [idFormaPagoElegida, setIdFormaPagoElegida] = useState(null);

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleNroTarjeta = (e) => {
    setNroTarjeta(e.target.value);
  };

  const handleVolver = () => {
    history.push('/11/');
  };

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleContinue = () => {
    fetch(
      `${BASE_URL}/solicitar-emision?cotizacion_id=${coberturaSeleccionada.id}&tipo_documento=${cliente.dniElegido}&documento=${cliente.dniValue}&sexo=${cliente.sexo}&cuit=${cliente.CUILT}&situacion_afip=${cliente.condicionIVA}&iibb=${cliente.condicionIIBB}&patente=${dataVehiculo.patente}&chasis=${dataVehiculo.chasis}&motor=${dataVehiculo.motor}&anios_siniestros=0&calle=${cliente.calle}&numero=${cliente.nro}&vigencia_desde=2020-10-01&numero_tarjeta=${nroTarjeta}&telefono=${cliente.tel}&estado_civil=1&forma_pago=4`,
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
        console.log(result);
        if (result.status) {
          history.push('/12/');
        } else {
          alert('Hubo un error al solicitar la emisión de póliza');
        }
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    fetch(`${BASE_URL}/catalogos/forma-de-pago`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setFormasPagos(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const elegirFormaPago = (value, id) => {
    setFormaPagoElegida(value);
    setIdFormaPagoElegida(id);
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
                      {coberturaSeleccionada.nombre}
                    </NombreCobertura>
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
                    <LogoImg src={SwissMedical} alt="Swiss Medical Seguros" />
                  </DetalleCuota>
                </Data>
              </Info>

              <Campos>
                <p>
                  Forma de pago:
                  {' '}
                  <span>Tarjeta de crédito</span>
                </p>
                <FieldSeparator>
                  <Input
                    type="text"
                    name="nombre"
                    placeholder="Nombre en la tarjeta"
                    onChange={handleNombre}
                  />

                  <Select
                    type="Formas de pago"
                    name="formasDePago"
                    options={formasPagos || []}
                    elegirOpcion={elegirFormaPago}
                    selectedValue={formaPagoElegida}
                  />

                  <Input
                    type="number"
                    name="tarjeta"
                    placeholder="Nro de tarjeta. Ej: 1234123412341234"
                    onChange={handleNroTarjeta}
                  />
                </FieldSeparator>
                <BtnContinue onClick={handleContinue}>Contratar</BtnContinue>
              </Campos>

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
  width: 100%;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
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

const Campos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & p {
    font-weight: 300;
    color: var(--verde);
    font-size: 14px;
    width: 100%;
    margin-bottom: 12px;

    & span {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
    }
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
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
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
