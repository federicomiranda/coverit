import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '../ProgressBar';

const Paso2 = () => {
  const vehiculo = useSelector((state) => state.vehiculo);
  const [loc, setLoc] = useState(false);
  const [locElegida, setLocElegida] = useState('');

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <ProgressBar percentaje="p20" />

          <Title>
            ¿Dónde usas
            {' '}
            {vehiculo === 'auto' ? 'el' : 'la'}
            {' '}
            <TitleMod>{vehiculo}</TitleMod>
            ?
          </Title>

          <Form action="#">
            <FieldSeparator>
              <InputCP
                type="text"
                name="cp"
                id="cp"
                placeholder="Código Postal"
              />
              <LabelCP htmlFor="cp">
                Si no conoces tu código postal, buscalo
                {' '}
                <AnchorCP href="/">aquí</AnchorCP>
              </LabelCP>
            </FieldSeparator>
            <FieldSeparator>
              <LabelLocalidad
                htmlFor="localidad"
                onClick={() => {
                  setLoc(true);
                }}
              >
                {locElegida || 'Localidad'}
                {' '}
                <LocIconContainer>
                  <FontAwesomeIcon icon={faSortDown} />
                </LocIconContainer>
              </LabelLocalidad>
            </FieldSeparator>

            {loc && (
              <ModalLocalidades>
                <ItemModalLocalidades
                  onClick={() => {
                    setLoc(false);
                    setLocElegida('Localidad 1');
                  }}
                >
                  Localidad 1
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 1"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 2
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 2"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 3
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 3"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
                <ItemModalLocalidades>
                  Localidad 4
                  <InputModalLocalidades
                    type="radio"
                    name="localidad"
                    value="localidad 4"
                  />
                </ItemModalLocalidades>
              </ModalLocalidades>
            )}
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

const FieldSeparator = styled.div`
  margin-bottom: 24px;
`;

const InputCP = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
`;

const LabelCP = styled.label`
  font-size: 16px;
  color: var(--gris);
  margin-top: 10px;
  display: inline-block;
`;

const AnchorCP = styled.a`
  color: var(--azul);
`;

const LabelLocalidad = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  color: var(--gris);
  padding: 5px;
  border: 1px solid var(--verde);
`;

const LocIconContainer = styled.div`
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

const ModalLocalidades = styled.div`
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

const ItemModalLocalidades = styled.label`
  display: block;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  font-size: 18px;
`;

const InputModalLocalidades = styled.label`
  display: none;
`;
