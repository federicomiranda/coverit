import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SolicitarAsistencia from '../SolicitarAsistencia';
import EditData from '../EditData';
import ProgressBar from '../ProgressBar';
import Select from '../Select';
import {
  addClientData,
  addClientTributeData,
  addClientPersonalData,
} from '../../actions';

const Paso9 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);

  const [asistencia, setAsistencia] = useState(false);
  const [data, setData] = useState(false);

  const [tipoDni, setTipoDni] = useState([]);
  const [dniElegido, setDniElegido] = useState('');
  const [idDniElegido, setIdDniElegido] = useState(null);
  const [dniValue, setDniValue] = useState('');

  const [ddElegido, setddElegido] = useState('');
  const [mmElegido, setmmElegido] = useState('');
  const [aaElegido, setaaElegido] = useState('');

  const [paises, setPaises] = useState([]);
  const [paisElegido, setPaisElegido] = useState('');
  const [idPaisElegido, setIdPaisElegido] = useState('');
  const [sexos, setSexos] = useState([]);
  const [sexoElegido, setSexoElegido] = useState('');
  const [idSexoElegido, setIdSexoElegido] = useState('');

  const [ivas, setIvas] = useState([]);
  const [ivaElegido, setIvaElegido] = useState('');
  const [idIvaElegido, setIdIvaElegido] = useState('');

  const [iibb, setIibb] = useState([]);
  const [iibbElegido, setIibbElegido] = useState('');
  const [idIibbElegido, setIdIibbElegido] = useState('');

  // const [cuilValue, setCuilValue] = useState('');
  const [cuitValue, setCuitValue] = useState('');
  const [iibbValue, setIibbValue] = useState('');

  const [datosTributarios, setDatosTributarios] = useState(false);

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const d = new Date();
  const n = d.getFullYear() - 18;
  const array_aa = [];
  for (let i = n; i >= 1920; i--) {
    array_aa.push(i);
  }

  const handleAsistencia = (value) => {
    setAsistencia(value);
  };

  const handleData = (value) => {
    setData(value);
  };

  const handleVolver = () => {
    history.push('/8/');
  };

  const handleVolverDos = () => {
    setDatosTributarios(false);
  };

  const stopSubmit = (e) => {
    e.preventDefault();
  };

  const handleContinue = () => {
    dispatch(
      addClientData({
        dniElegido: idDniElegido,
        dniValue,
        nacimiento: `${ddElegido}/${mmElegido}/${aaElegido}`,
        pais: idPaisElegido,
        sexo: idSexoElegido,
      }),
    );

    if (dniElegido !== 'C.U.I.T.') {
      let idSexo;

      if (idSexoElegido === '0') {
        idSexo = '2';
      } else if (idSexoElegido === '1') {
        idSexo = '1';
      }

      fetch(
        `${BASE_URL}/generar-cuit?documento=${dniValue}&sexo=${idSexo}&tipo=1`,
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
          dispatch(
            addClientPersonalData({
              CUILT: result.numero,
              condicionIVA: '5',
              condicionIIBB: '3',
            }),
          );
        })
        .catch((error) => console.log('error', error));

      history.push('/10/');
    } else {
      setDatosTributarios(true);
    }
  };

  const handleContinueTributario = () => {
    dispatch(
      addClientTributeData({
        CUILT: cuitValue,
        condicionIVA: idIvaElegido,
        condicionIIBB: idIibbElegido || '3',
        IIBB: iibbValue,
      }),
    );

    history.push('/10/');
  };

  useEffect(() => {
    fetch(`${BASE_URL}/catalogos/tipos-de-documento`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        const tiposValidos = [];

        for (let i = 0; i < result.length; i++) {
          if (result[i].id === 7) {
            tiposValidos.push(result[i]);
          } else if (result[i].id === 8) {
            tiposValidos.push(result[i]);
          }
        }
        setTipoDni(tiposValidos);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/paises`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setPaises(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/catalogos/sexo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setSexos(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/catalogos/posiciones-frente-al-iva`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setIvas(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/catalogos/posiciones-frente-a-iibb`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setIibb(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    if (paises.length === 1) {
      setPaisElegido(paises[0].name);
      setIdPaisElegido(paises[0].id);
    }
  }, [paises]);

  const elegirDni = (value, id) => {
    setDniElegido(value);
    setIdDniElegido(id);
  };

  const handleChangeDNI = (e) => {
    setDniValue(e.target.value);

    if (dniElegido === 'C.U.I.T.') {
      setCuitValue(e.target.value);
    }
  };

  const elegirdd = (value) => {
    setddElegido(value);
  };

  const elegirmm = (value) => {
    setmmElegido(value);
  };

  const elegiraa = (value) => {
    setaaElegido(value);
  };

  const elegirPais = (value, id) => {
    setPaisElegido(value);
    setIdPaisElegido(id);
  };

  const elegirSexo = (value, id) => {
    setSexoElegido(value);
    setIdSexoElegido(id);
  };

  const elegirIva = (value, id) => {
    setIvaElegido(value);
    setIdIvaElegido(id);
  };

  const elegirIibb = (value, id) => {
    setIibbElegido(value);
    setIdIibbElegido(id);
  };

  const handleChangeCuit = (e) => {
    setCuitValue(e.target.value);
  };

  const handleChangeIibb = (e) => {
    setIibbValue(e.target.value);
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <>
          <CointainerAzul>
            <>
              <ProgressBar percentaje="p2" value="2 de 6" />

              {!datosTributarios ? (
                <>
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
                      <p>
                        <DataClienteNombre>
                          {cliente.nombre}
                          {' '}
                          {cliente.apellido}
                        </DataClienteNombre>
                        <br />
                        dirección de correo al que enviaremos la póliza
                        {' '}
                        <DataClienteEmail>{cliente.email}</DataClienteEmail>
                      </p>
                      <DataClienteEditar onClick={() => handleData(true)}>
                        editar
                      </DataClienteEditar>
                    </DataCliente>
                  </Info>

                  <Form onSubmit={stopSubmit}>
                    <Select
                      type="Documento"
                      name="Documento"
                      options={tipoDni || []}
                      elegirOpcion={elegirDni}
                      selectedValue={dniElegido}
                    />

                    <FieldSeparator>
                      <Input
                        type="text"
                        name="dni"
                        id="dni"
                        placeholder="12345678"
                        onChange={handleChangeDNI}
                        minLength="7"
                        maxLength="11"
                      />
                    </FieldSeparator>

                    <FechaDeNacimiento>Fecha de nacimiento</FechaDeNacimiento>

                    <Row>
                      <Select
                        type="dd"
                        name="dd"
                        options={[
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7,
                          8,
                          9,
                          10,
                          11,
                          12,
                          13,
                          14,
                          15,
                          16,
                          17,
                          18,
                          19,
                          20,
                          21,
                          22,
                          23,
                          24,
                          25,
                          26,
                          27,
                          28,
                          29,
                          30,
                          31,
                        ]}
                        elegirOpciondd={elegirdd}
                        selectedValue={ddElegido}
                        className="rowItem"
                      />

                      <Select
                        type="mm"
                        name="mm"
                        options={[
                          'Enero',
                          'Febrero',
                          'Marzo',
                          'Abril',
                          'Mayo',
                          'Junio',
                          'Julio',
                          'Agosto',
                          'Septiembre',
                          'Octubre',
                          'Noviembre',
                          'Diciembre',
                        ]}
                        elegirOpcionmm={elegirmm}
                        selectedValue={mmElegido}
                        className="rowItem"
                      />

                      <Select
                        type="aa"
                        name="aa"
                        options={array_aa}
                        elegirOpcionaa={elegiraa}
                        selectedValue={aaElegido}
                        className="rowItem"
                      />
                    </Row>

                    <RowDos>
                      <Select
                        type="Nacionalidad"
                        name="Nacionalidad"
                        options={paises || []}
                        elegirOpcion={elegirPais}
                        selectedValue={paisElegido}
                        className="rowDosItem"
                      />

                      <Select
                        type="Sexo"
                        name="Sexo"
                        options={sexos || []}
                        elegirOpcion={elegirSexo}
                        selectedValue={sexoElegido}
                        className="rowDosItem"
                      />
                    </RowDos>
                  </Form>

                  <BtnContinue
                    className={
                      dniElegido
                      && parseInt(dniValue)
                      && dniValue.length >= 7
                      && ddElegido
                      && mmElegido
                      && aaElegido
                      && paisElegido
                      && sexoElegido
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
              ) : (
                <ContainerBlanco>
                  <Volver>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      onClick={handleVolverDos}
                    />
                  </Volver>

                  <DatosTributariosTitle>
                    Ingresá tus datos tributarios por favor:
                  </DatosTributariosTitle>

                  <FieldSeparator>
                    <InputTributario
                      type="text"
                      name="CUIT"
                      id="CUIT"
                      placeholder="CUIT"
                      value={cuitValue || ''}
                      onChange={handleChangeCuit}
                    />
                  </FieldSeparator>

                  <DosColumnas>
                    <Label>Condición IVA</Label>
                    <Select
                      type="IVA"
                      name="IVA"
                      options={ivas || []}
                      elegirOpcion={elegirIva}
                      selectedValue={ivaElegido}
                    />
                  </DosColumnas>

                  <DosColumnas>
                    <Label>Condición de IIBB</Label>
                    <Select
                      type="IIBB"
                      name="IIBB"
                      options={iibb || []}
                      elegirOpcion={elegirIibb}
                      selectedValue={iibbElegido}
                    />
                  </DosColumnas>

                  <FieldSeparator>
                    <InputTributario
                      type="NIIBB"
                      name="NIIBB"
                      id="NIIBB"
                      placeholder="Número de IIBB"
                      onChange={handleChangeIibb}
                    />
                  </FieldSeparator>

                  <BtnContinue onClick={handleContinueTributario}>
                    Continuar
                  </BtnContinue>
                  <BtnAsistencia onClick={() => handleAsistencia(true)}>
                    Solicitar asistencia
                  </BtnAsistencia>
                </ContainerBlanco>
              )}
            </>
          </CointainerAzul>

          {asistencia && (
            <SolicitarAsistencia handleAsistencia={handleAsistencia} />
          )}

          {data && <EditData handleData={handleData} />}
        </>
      )}
    </>
  );
};

export default Paso9;

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

const DataClienteNombre = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

const DataClienteEmail = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const DataClienteEditar = styled.span`
  border: none;
  background: none;
  color: #fff;
  text-decoration: underline;
  font-size: 16px;
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

const InputTributario = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--azul);
  padding: 10px 5px;
  border: 1px solid var(--azul);
  background: none;
  font-weight: 300;
  outline: none;

  &::placeholder {
    color: #888;
    opacity: 1;
    font-weight: 300;
  }

  &:-ms-input-placeholder {
    color: #888;
    font-weight: 300;
  }

  &::-ms-input-placeholder {
    color: #888;
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

const FechaDeNacimiento = styled.p`
  color: #fff;
  margin-bottom: 24px;
`;

const ContainerBlanco = styled.div`
  background: #fff;
  border-radius: 20px;
  margin-top: 8px;
  padding: 20px;
`;

const DatosTributariosTitle = styled.h1`
  color: var(--azul);
  font-weight: 300;
  font-style: italic;
  font-size: 18px;
  text-align: center;
  width: 70%;
  margin: 24px auto;
`;

const DosColumnas = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p`
  margin-bottom: 24px;
  width: 50%;
  color: var(--gris);

  & + div {
    width: 50%;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    flex: 1;
  }

  & > div:nth-child(2) {
    margin: 0 12px;
  }
`;

const RowDos = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    flex: 1;
  }

  & > div:last-child {
    margin-left: 12px;
  }
`;
