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
  state = true,
  selectedValue,
}) => {
  const [modal, openModal] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options.length === 0) {
      setValue('');
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

  return (
    <>
      <FieldSeparator>
        <LabelSelect
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

      {type !== 'Año' && modal && options && (
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
