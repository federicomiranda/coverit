import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const Select = ({
  type, name, options, elegirOpcion, state = true,
}) => {
  const [modal, openModal] = useState(false);
  const [value, setValue] = useState('');

  const handleSelect = (option) => {
    openModal(false);
    elegirOpcion(option);
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
          {value || type}
          {' '}
          <SelectIconContainer>
            <FontAwesomeIcon icon={faSortDown} />
          </SelectIconContainer>
        </LabelSelect>
      </FieldSeparator>

      {modal && (
        <ModalSelect>
          {options.map((option) => (
            <ItemModalSelect onClick={() => handleSelect(option)} key={option}>
              {option}
              <InputModalSelect type="radio" name={name} value={option} />
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
