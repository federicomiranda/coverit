import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import imgPlacehold from '../../assets/foto1.jpg';

const Inspeccion1 = () => {
  const [loading, setLoading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');

  const handleChangePhoto = () => {
    setLoading(true);
    const file = document.getElementById('foto').files[0];
    if (file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreviewSrc(reader.result);
        setLoading(false);
      };
    }
  };

  return (
    <>
      <Container>
        <Title>
          Inspección
          {' '}
          <TitleMod>Digital</TitleMod>
        </Title>

        <Content>
          <TextContent>Foto 1: Título</TextContent>
          <TextContent>
            Asegurate de que se vea todo el frente, el parabrisas completo y la
            patente
          </TextContent>
          {previewSrc ? (
            <Img src={previewSrc} />
          ) : (
            <Img src={imgPlacehold} className="placehold" />
          )}
          <BtnCamera>
            {loading ? (
              <Loader
                type="Oval"
                color="#213c83"
                width={50}
                height={50}
                timeout={100000}
              />
            ) : (
              <>
                <InputCamera
                  type="file"
                  accept="image/*"
                  capture="camera"
                  id="foto"
                  onChange={handleChangePhoto}
                />
                <FontAwesomeIcon icon={faCamera} />
                Tomar foto
              </>
            )}
          </BtnCamera>
        </Content>

        <Btns>
          <BtnBack>
            <Link to="/inspeccion/">Volver</Link>
          </BtnBack>
          <BtnContinue>
            <Link to="/inspeccion/fotos/1">Siguiente</Link>
          </BtnContinue>
        </Btns>
      </Container>
    </>
  );
};

export default Inspeccion1;

/*
 *
 *
 * STYLES
 *
 *
 */

const Container = styled.div`
  padding: 30px 15px;
  background: var(--verde);
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  margin-bottom: 32px;
  font-weight: 300;
  color: var(--azul);
  text-align: center;
  font-size: 28px;
`;

const TitleMod = styled.span`
  color: #fff;
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const TextContent = styled.p`
  color: #fff;
  font-weight: 300;
  line-height: 1.3;
  margin-bottom: 20px;
`;

const Btns = styled.div`
  display: flex;
  width: 300px;
  margin: 0 auto;
`;

const BtnBack = styled.div`
  background: none;
  border: 1px solid #fff;
  padding: 10px 20px;
  text-align: center;
  display: block;
  flex: 1;
  margin-right: 10px;

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const BtnContinue = styled.div`
  background: var(--azul);
  border: 1px solid var(--azul);
  padding: 10px 20px;
  text-align: center;
  display: block;
  flex: 1;

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const Img = styled.img`
  width: 300px;
  height: 225px;
  object-fit: contain;

  &.placehold {
    opacity: 0.5;
  }
`;

const BtnCamera = styled.label`
  width: 300px;
  padding: 10px;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  margin: 12px auto 0;

  & svg {
    margin-right: 10px;
  }
`;

const InputCamera = styled.input`
  display: none;
`;
