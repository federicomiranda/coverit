import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { setEditData } from '../actions';

const EditData = ({ handleData }) => {
  const dispatch = useDispatch();
  const cliente = useSelector((state) => state.cliente);

  const [nombre, setNombre] = useState(cliente.nombre);
  const [apellido, setApellido] = useState(cliente.apellido);
  const [email, setEmail] = useState(cliente.email);

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleApellido = (e) => {
    setApellido(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleEditData = () => {
    dispatch(setEditData({ nombre, apellido, email }));

    handleData(false);
  };

  return (
    <DataContainer>
      <DataContenido>
        <CerrarData>
          <FontAwesomeIcon icon={faTimes} onClick={() => handleData(false)} />
        </CerrarData>
        <DataTitle>
          Es IMPORTANTE que tus datos sean correctos, a este correo llegará tu
          póliza
        </DataTitle>
        <DataInput
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleNombre}
        />
        <DataInput
          type="text"
          name="apellido"
          value={apellido}
          onChange={handleApellido}
        />
        <DataInput
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
        <DataBtn onClick={handleEditData}>Confirmar datos</DataBtn>
      </DataContenido>
    </DataContainer>
  );
};

export default EditData;

/*
 *
 *
 * STYLES
 *
 *
 */

const DataContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataContenido = styled.div`
  background: #fff;
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const CerrarData = styled.span`
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

const DataTitle = styled.p`
  font-size: 16px;
  color: var(--gris);
  text-align: center;
  font-style: italic;
  width: 80%;
  margin: 0 auto 12px;
  font-weight: 300;
`;

const DataInput = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
  margin-bottom: 12px;
`;

const DataBtn = styled.div`
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
