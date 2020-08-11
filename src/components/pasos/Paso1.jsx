import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar';
import MotoIcon from '../MotoIcon';
import AutoIcon from '../AutoIcon';
import { selectMoto, selectAuto } from '../../actions';

const Paso1 = () => {
  const dispatch = useDispatch();

  const handleClick = (vehiculo) => {
    if (vehiculo === 'moto') {
      dispatch(selectMoto());
    } else if (vehiculo === 'auto') {
      dispatch(selectAuto());
    }
  };

  return (
    <>
      <Container>
        <ProgressBar percentaje="p1" value="1 de 6" />

        <Title>
          ¿Qué vas a
          {' '}
          <TitleMod>cotizar</TitleMod>
          ?
        </Title>

        <OptionsList>
          <OptionsListItem>
            <Link className="link" to="/2/" onClick={() => handleClick('moto')}>
              <MotoIcon color="azul" />
            </Link>
          </OptionsListItem>
          <OptionsListItem>
            <Link className="link" to="/2/" onClick={() => handleClick('auto')}>
              <AutoIcon color="azul" />
            </Link>
          </OptionsListItem>
        </OptionsList>
      </Container>
    </>
  );
};

export default Paso1;

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

const OptionsList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionsListItem = styled.li`
  width: 130px;
  height: 130px;
  border: 1px solid var(--verde);
  border-radius: 50%;
  margin: 0 20px;
  &:active {
    background: var(--verde);
  }
  & .link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
