import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import { setClientData, setSA } from '../../actions';

const Paso4 = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);
  const asegurar = useSelector((state) => state.asegurar);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const [nombre, setNombre] = useState(cliente.nombre || '');
  const [apellido, setApellido] = useState(cliente.apellido || '');
  const [edad, setEdad] = useState(cliente.edad || '');
  const [email, setEmail] = useState(cliente.email || '');
  const [tel, setTel] = useState(cliente.tel || '');
  const [sumaAsegurada, setSumaAsegurada] = useState(0);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  };

  const handleChangeEdad = (e) => {
    setEdad(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeTel = (e) => {
    setTel(e.target.value);
  };

  const saveData = () => {
    fetch(
      `${BASE_URL}/suma-asegurada?version_id=${asegurar.idVersionElegida}&anio=${asegurar.anioElegido}`,
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
        setSumaAsegurada(result.suma_asegurada);
        dispatch(setSA(result.suma_asegurada));
      })
      .catch((error) => console.log('error', error));

    dispatch(setClientData({
      nombre,
      apellido,
      edad,
      email,
      tel,
    }));
  };

  const stopSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p4" value="4 de 6" />

          <Title>
            <TitleMod>Pasanos</TitleMod>
            {' '}
            tus datos
          </Title>

          <Form onSubmit={stopSubmit}>
            <FieldSeparator>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre completo"
                onChange={handleChangeNombre}
                value={nombre}
                maxLength="40"
              />
            </FieldSeparator>

            <FieldSeparator>
              <Input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="Apellido"
                onChange={handleChangeApellido}
                value={apellido}
                maxLength="80"
              />
            </FieldSeparator>

            <FieldSeparator>
              <Input
                type="text"
                name="edad"
                id="edad"
                placeholder="Edad"
                onChange={handleChangeEdad}
                value={edad}
                maxLength="2"
              />
            </FieldSeparator>

            <FieldSeparator>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                onChange={handleChangeEmail}
                value={email}
                maxLength="80"
              />
            </FieldSeparator>

            <FieldSeparator>
              <Input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Celular ej 1122334455"
                onChange={handleChangeTel}
                value={tel}
                maxLength="10"
              />
              <Disclaimer>Código de área sin 0 y sin 15</Disclaimer>
            </FieldSeparator>

            <Btns>
              <BtnBack>
                <Link to="/3/">Volver</Link>
              </BtnBack>

              <BtnContinue
                className={
                  nombre
                  && /^([a-z ñáàãéèëêíìîïóõöôòúùûü]{2,40})$/i.test(nombre)
                  && apellido
                  && /^([a-z ñáàãéèëêíìîïóõöôòúùûü]{2,80})$/i.test(apellido)
                  && parseInt(edad)
                  && parseInt(edad) >= 18
                  && parseInt(edad) <= 100
                  && email
                  && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email,
                  )
                  && tel
                  && tel.length > 8
                  && tel.length < 12
                    ? ''
                    : 'disabled'
                }
              >
                <Link onClick={saveData} to="/5/">
                  Continuar
                </Link>
              </BtnContinue>
            </Btns>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Paso4;

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
  margin-bottom: 32px;
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

const FieldSeparator = styled.div`
  margin-bottom: 24px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
`;

const Disclaimer = styled.p`
  color: var(--azul);
  font-size: 14px;
  width: 60%;
  margin: 5px auto 24px;
  text-align: center;
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
