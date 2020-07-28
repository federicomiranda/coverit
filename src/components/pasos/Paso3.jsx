import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import Select from '../Select';
import {
  setVehiculoAsegurar,
} from '../../actions';

const Paso2 = () => {
  const dispatch = useDispatch();
  const vehiculo = useSelector((state) => state.vehiculo);
  const asegurar = useSelector((state) => state.asegurar);

  const [marcaElegida, setMarcaElegida] = useState(asegurar.marcaElegida || '');
  const [idMarcaElegida, setIdMarcaElegida] = useState(null);
  const [modeloElegido, setModeloElegido] = useState(asegurar.modeloElegido || '');
  const [idModeloElegido, setIdModeloElegido] = useState(null);
  const [anioElegido, setAnioElegido] = useState(asegurar.anioElegido || '');
  const [versionElegida, setVersionElegida] = useState(asegurar.versionElegida || '');
  const [idVersionElegida, setIdVersionElegida] = useState(null);
  const [gnc, setGnc] = useState(asegurar.gnc || false);
  const [gncValue, setGncValue] = useState(asegurar.gncValue || 0);
  const token = useSelector((state) => state.token);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anios, setAnios] = useState([]);
  const [versiones, setVersiones] = useState([]);

  useEffect(() => {
    setMarcas([]);
    setModelos([]);
    setAnios([]);
    setVersiones([]);
    fetch(`${BASE_URL}/marcas?tipo=${vehiculo}`, {
      method: 'POST',
      headers: {
        Authorization:
            `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setMarcas(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    setModelos([]);
    setAnios([]);
    setVersiones([]);
    fetch(`${BASE_URL}/modelos?brand_id=${idMarcaElegida}`, {
      method: 'POST',
      headers: {
        Authorization:
            `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setModelos(result);
      })
      .catch((error) => console.log('error', error));
  }, [idMarcaElegida]);

  useEffect(() => {
    setAnios([]);
    setVersiones([]);
    fetch(`${BASE_URL}/anios?brand_id=${idMarcaElegida}&model_id=${idModeloElegido}`, {
      method: 'POST',
      headers: {
        Authorization:
            `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setAnios(result);
      })
      .catch((error) => console.log('error', error));
  }, [idModeloElegido]);

  useEffect(() => {
    setVersiones([]);
    fetch(
      `${BASE_URL}/versiones?brand_id=${idMarcaElegida}&model_id=${idModeloElegido}&anio=${anioElegido}`,
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
        setVersiones(result);
      })
      .catch((error) => console.log('error', error));
  }, [anioElegido]);

  const elegirMarca = (value, id) => {
    setMarcaElegida(value);
    setIdMarcaElegida(id);
  };

  const elegirModelo = (value, id) => {
    setModeloElegido(value);
    setIdModeloElegido(id);
  };

  const elegirAnio = (value) => {
    setAnioElegido(value);
  };

  const elegirVersion = (value, id) => {
    setVersionElegida(value);
    setIdVersionElegida(id);
  };

  const handleGnc = (e) => {
    setGncValue(e.target.value);
  };

  const setData = () => {
    dispatch(setVehiculoAsegurar({
      marcaElegida,
      modeloElegido,
      idModeloElegido,
      anioElegido,
      versionElegida,
      idVersionElegida,
      gnc,
      gncValue,
    }));
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p3" value="3 de 6" />

          <Title>
            ¿Qué
            {' '}
            {vehiculo}
            {' '}
            vas a
            {' '}
            <TitleMod>asegurar</TitleMod>
            ?
          </Title>

          <Form action="#">
            <Select
              type="Marca"
              name="marca"
              options={marcas || []}
              elegirOpcion={elegirMarca}
              selectedValue={marcaElegida}
            />

            <Select
              state={!!marcaElegida}
              type="Modelo"
              name="modelo"
              options={modelos || []}
              elegirOpcion={elegirModelo}
              selectedValue={modeloElegido}
            />

            <Select
              state={!!modeloElegido}
              type="Año"
              name="anio"
              options={anios || []}
              elegirOpcionAnio={elegirAnio}
              selectedValue={anioElegido}
            />

            <Select
              state={!!anioElegido}
              type="Versión"
              name="version"
              options={versiones || []}
              elegirOpcion={elegirVersion}
              selectedValue={versionElegida}
            />

            <GncContainer>
              <GncFirstColumn>
                <p>GNC</p>
                <GncOptionsContainer>
                  <GncOptionsLabelNo className={gnc ? '' : 'active'} onClick={() => { setGnc(false); setGncValue(''); }}>
                    No
                    <input type="radio" value="No" name="gnc" />
                  </GncOptionsLabelNo>
                  <GncOptionsLabelSi className={gnc ? 'active' : ''} onClick={() => { setGnc(true); }}>
                    Si
                    <input type="radio" value="Si" name="gnc" />
                  </GncOptionsLabelSi>
                </GncOptionsContainer>
              </GncFirstColumn>
              {gnc && (
              <GncSecondColumn>
                <input type="number" placeholder="10000" name="gnc_value" value={gncValue} onChange={handleGnc} />
              </GncSecondColumn>
              )}
            </GncContainer>

            <Btns>
              <BtnBack>
                <Link to="/2/">Volver</Link>
              </BtnBack>

              <BtnContinue className={!versionElegida ? 'disabled' : gnc ? gncValue ? '' : 'disabled' : ''}>
                <Link onClick={setData} to="/4/">Continuar</Link>
              </BtnContinue>
            </Btns>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Paso2;

/*
 *
 *
 * STYLES
 *
 *
 */

const Container = styled.div`
  padding: 30px 15px;
`;

const Title = styled.p`
  margin-top: 92px;
  margin-bottom: 102px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: var(--verde);
`;

const Form = styled.form`
  width: 90%;
  margin: auto;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  margin-right: 20px;

  & a {
    color: var(--verde);
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const BtnContinue = styled.div`
  background: var(--verde);
  border: none;
  padding: 10px 20px;

  &.disabled {
    background: var(--verde-disabled);
  }

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }

  &.disabled a {
    pointer-events: none;
  }
`;

const GncContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const GncFirstColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
  padding-left: 5px;
  color: var(--gris);
`;

const GncSecondColumn = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  position: relative;

  &::before {
    content: '$';
    text-align: left;
    display: block;
    position: absolute;
    left: 8px;
    color: var(--gris);
  }

  & input {
    padding: 5px;
    font-size: 16px;
    color: var(--gris);
    border: 2px solid var(--verde);
    text-align: right;
  }
`;

const GncOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  border: 2px solid var(--verde);
`;

const GncOptionsLabelNo = styled.label`
  display: block;
  width: 50%;
  text-align: center;
  padding: 5px 0;
  text-transform: uppercase;
  color: var(--azul);

  &.active {
    color: #fff;
    background: var(--verde);
  }

  & input {
    display: none;
  }
`;

const GncOptionsLabelSi = styled.label`
  display: block;
  width: 50%;
  text-align: center;
  padding: 5px 0;
  text-transform: uppercase;
  color: var(--azul);

  &.active {
    color: #fff;
    background: var(--verde);
  }

  & input {
    display: none;
  }
`;
