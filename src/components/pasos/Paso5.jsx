import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import {
  setSolicitud,
  setCoberturas,
} from '../../actions';

import SwissMedical from '../../assets/sm_seguros.png';

const Paso5 = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const history = useHistory();

  const vehiculo = useSelector((state) => state.vehiculo);
  const cliente = useSelector((state) => state.cliente);
  const asegurar = useSelector((state) => state.asegurar);
  const cp = useSelector((state) => state.cp);
  const localidad = useSelector((state) => state.loc);
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/coberturas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((rta) => {
        const coberturas = [];
        rta.map((cobertura) => {
          coberturas.push(cobertura.nombre);
        });
        dispatch(setCoberturas(coberturas));
      })
      .catch((error) => console.log('error', error));

    fetch(
      `${BASE_URL}/cotizar?nombre=${cliente.nombre}&apellido=${cliente.apellido}&edad=${cliente.edad}&email=${cliente.email}&celular=${cliente.tel}&localidad_id=${localidad.idLocElegida}&version_id=${asegurar.idVersionElegida}&anio=${asegurar.anioElegido}&tipo=vehiculo&tipo_uso=particular`,
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
        dispatch(setSolicitud(result));
        history.push('/6/');
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      {!vehiculo ? (
        <Redirect to="/" />
      ) : (
        <Container>
          {sumaAsegurada !== 0 && (
            <>
              <ProgressBar percentaje="p5" value="5 de 6" />

              <Title>
                <TitleMod>{cliente.nombre}</TitleMod>
                {', '}
                estamos buscando las mejores coberturas para tu auto.
              </Title>

              <DataList>
                <DataListItem>{asegurar.marcaElegida}</DataListItem>
                <DataListItem>{asegurar.modeloElegido}</DataListItem>
                <DataListItem>{asegurar.anioElegido}</DataListItem>
                <DataListItem>
                  CP
                  {cp}
                </DataListItem>
              </DataList>

              <SumaAseguradaContainer>
                <SumaAseguradaValue>
                  $
                  {new Intl.NumberFormat('de-DE').format(sumaAsegurada)}
                </SumaAseguradaValue>
                <SumaAseguradaText>Suma asegurada</SumaAseguradaText>
              </SumaAseguradaContainer>

              <EstamosCotizandoContainer>
                <EstamosCotizandoText>
                  Estamos cotizando en...
                </EstamosCotizandoText>
                <EstamosCotizandoImg
                  src={SwissMedical}
                  alt="Swiss Medical Seguros"
                />
              </EstamosCotizandoContainer>
              {/* {handleChange()} */}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Paso5;

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
  margin-top: 24px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 20px;
`;

const TitleMod = styled.span`
  color: var(--verde);
`;

const DataList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const DataListItem = styled.li`
  flex: 1;
  margin: 0 5px;
  padding: 10px 5px;
  border: 1px solid var(--azul);
  text-transform: uppercase;
  color: var(--azul);
  text-align: center;
  border-radius: 5px;
`;

const SumaAseguradaContainer = styled.div`
  padding: 16px 0;
  text-align: center;
`;

const SumaAseguradaValue = styled.p`
  color: var(--verde);
  font-size: 20px;
  font-weight: 300;
`;

const SumaAseguradaText = styled.p`
  color: var(--verde);
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 500;
`;

const EstamosCotizandoContainer = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const EstamosCotizandoText = styled.p`
  color: var(--azul);
  font-size: 20px;
  margin-bottom: 24px;
`;

const EstamosCotizandoImg = styled.img`
  width: 60%;
`;