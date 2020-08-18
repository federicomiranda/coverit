import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const Select = ({
  type,
  name,
  options,
  elegirOpcion,
  elegirOpcionAnio,
  elegirOpciondd,
  elegirOpcionmm,
  elegirOpcionaa,
  state = true,
  selectedValue,
}) => {
  const [modal, openModal] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options.length === 0) {
      setValue('');
    } else if (
      options.length > 1
             && type !== 'Documento'
             && type !== 'dd'
             && type !== 'mm'
             && type !== 'aa'
             && type !== 'Sexo'
             && type !== 'IVA'
             && type !== 'IIBB'
    ) {
      openModal(true);
    }
  }, [options]);

  const handleSelect = (option, id) => {
    openModal(false);
    elegirOpcion(option, id);
    setValue(option);
  };

  const handleSelectAnio = (option) => {
    openModal(false);
    elegirOpcionAnio(option);
    setValue(option);
  };

  const handleSelectdd = (option) => {
    openModal(false);
    elegirOpciondd(option);
    setValue(option);
  };

  const handleSelectmm = (option) => {
    openModal(false);
    elegirOpcionmm(option);
    setValue(option);
  };

  const handleSelectaa = (option) => {
    openModal(false);
    elegirOpcionaa(option);
    setValue(option);
  };

  const handleSelectDNI = (option, id) => {
    openModal(false);
    elegirOpcion(option, id);
    setValue(option);
  };

  const handleSelectSexo = (option, id) => {
    openModal(false);
    elegirOpcion(option, id);
    setValue(option);
  };

  const handleSelectIva = (option, id) => {
    openModal(false);
    elegirOpcion(option, id);
    setValue(option);
  };

  const handleSelectIibb = (option, id) => {
    openModal(false);
    elegirOpcion(option, id);
    setValue(option);
  };

  return (
    <>
      <FieldSeparator>
        <LabelSelect
          id={
            type === 'Documento'
            || type === 'dd'
            || type === 'mm'
            || type === 'aa'
            || type === 'Nacionalidad'
            || type === 'Sexo'
              ? 'blanco'
              : ''
          }
          className={!state ? 'disabled' : ''}
          htmlFor={name}
          onClick={() => {
            openModal(true);
          }}
        >
          {selectedValue || value || type}
          {' '}
          <SelectIconContainer>
            <FontAwesomeIcon icon={faSortDown} />
          </SelectIconContainer>
        </LabelSelect>
      </FieldSeparator>

      {type !== 'Año'
        && type !== 'Documento'
        && type !== 'dd'
        && type !== 'mm'
        && type !== 'aa'
        && type !== 'Sexo'
        && type !== 'IVA'
        && type !== 'IIBB'
        && modal
        && options.length > 1 && (
          <ModalSelect>
            {options.map((option) => (
              <ItemModalSelect
                onClick={() => handleSelect(option.name, option.id)}
                key={option.id}
              >
                {option.name}
                <InputModalSelect type="radio" name={name} value={option.id} />
              </ItemModalSelect>
            ))}
          </ModalSelect>
      )}

      {type === 'Año' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectAnio(option.anio)}
              key={option.anio}
            >
              {option.anio}
              <InputModalSelect type="radio" name={name} value={option.anio} />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'Documento' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectDNI(option.description, option.name)}
              key={option.id}
            >
              {option.description}
              <InputModalSelect
                type="radio"
                name={name}
                value={option.description}
              />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'dd' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectdd(option)}
              key={option}
            >
              {option}
              <InputModalSelect type="radio" name={name} value={option} />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'mm' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectmm(option)}
              key={option}
            >
              {option}
              <InputModalSelect type="radio" name={name} value={option} />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'aa' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectaa(option)}
              key={option}
            >
              {option}
              <InputModalSelect type="radio" name={name} value={option} />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'Sexo' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectSexo(option.description, option.name)}
              key={option.id}
            >
              {option.description}
              <InputModalSelect
                type="radio"
                name={name}
                value={option.description}
              />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'IVA' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectIva(option.description, option.name)}
              key={option.id}
            >
              {option.description}
              <InputModalSelect
                type="radio"
                name={name}
                value={option.description}
              />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}

      {type === 'IIBB' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectIva(option.description, option.name)}
              key={option.id}
            >
              {option.description}
              <InputModalSelect
                type="radio"
                name={name}
                value={option.description}
              />
            </ItemModalSelect>
          ))}
        </ModalSelect>
      )}
    </>
  );
};

export default Select;

/*
 *
 *
 * STYLES
 *
 *
 */

const FieldSeparator = styled.div`
   margin-bottom: 24px;
 `;

const LabelSelect = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);

  &#blanco {
    color: #fff;
  }

  &.disabled {
    pointer-events: none;
  }
`;

const SelectIconContainer = styled.div`
  background: var(--verde);
  height: 22px;
  width: 22px;
  display: flex;
  justify-content: center;
  color: #fff;

  & svg {
    position: relative;
    top: -2px;
  }
`;

const ModalSelect = styled.div`
  position: fixed;
  width: 80%;
  height: 80vh;
  left: 10%;
  top: 10vh;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ItemModalSelect = styled.label`
  display: block;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  font-size: 18px;
`;

const InputModalSelect = styled.label`
  display: none;
`;
