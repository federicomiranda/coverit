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
  const [optionsSearch, setOptionsSearch] = useState([]);

  useEffect(() => {
    if (options.length === 0) {
      setValue('');
    } else if (
      options.length > 1
             && type !== 'Marca'
             && type !== 'Documento'
             && type !== 'dd'
             && type !== 'mm'
             && type !== 'aa'
             && type !== 'Sexo'
             && type !== 'IVA'
             && type !== 'IIBB'
             && type !== 'Formas de pago'
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

  const handleSelectFormasPagos = (option, id) => {
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

  const handleSearch = (e) => {
    const newOptions = [];

    if (e.target.value.length >= 3) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
          newOptions.push(options[i]);
        }
      }
      setOptionsSearch(newOptions);
    } else {
      setOptionsSearch([]);
    }
  };

  return (
    <>
      <FieldSeparator className={type === 'Formas de pago' ? 'fdp' : ''}>
        <LabelSelect
          id={
            type === 'Documento'
            || type === 'dd'
            || type === 'mm'
            || type === 'aa'
            || type === 'Nacionalidad'
            || type === 'Sexo'
            || type === 'Formas de pago'
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
          {options.length > 1 && (
            <SelectIconContainer>
              <FontAwesomeIcon icon={faSortDown} />
            </SelectIconContainer>
          )}
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
        && type !== 'Formas de pago'
        && modal
        && options.length > 1 && (
          <ModalSelect>
            <InputSearch type="search" placeholder="Buscar" onChange={handleSearch} />
            {optionsSearch.length > 0 ? (
              <>
                {optionsSearch.map((option) => (
                  <ItemModalSelect
                    onClick={() => handleSelect(option.name, option.id)}
                    key={option.id}
                  >
                    {option.name}
                    <InputModalSelect
                      type="radio"
                      name={name}
                      value={option.id}
                    />
                  </ItemModalSelect>
                ))}
              </>
            ) : (
              <>
                {options.map((option) => (
                  <ItemModalSelect
                    onClick={() => handleSelect(option.name, option.id)}
                    key={option.id}
                  >
                    {option.name}
                    <InputModalSelect
                      type="radio"
                      name={name}
                      value={option.id}
                    />
                  </ItemModalSelect>
                ))}
              </>
            )}
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

      {type === 'Formas de pago' && modal && options && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect
              onClick={() => handleSelectFormasPagos(option.description, option.name)}
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
    
  &.fdp {
    width: 100%;
  }
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
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 2;
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

const InputSearch = styled.input`
  border: none;
  padding: 5px;
  font-size: 16px;
  color: var(--gris);
  margin-bottom: 12px;
  display: block;
  width: 100%;
`;
