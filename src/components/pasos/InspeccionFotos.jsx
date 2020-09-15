import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import imgPlaceholdUno from '../../assets/foto1.jpg';
import imgPlaceholdDos from '../../assets/foto2.jpg';
import imgPlaceholdTres from '../../assets/foto3.jpg';
import imgPlaceholdCuatro from '../../assets/foto4.jpg';
import imgPlaceholdCinco from '../../assets/foto5.jpg';
import imgPlaceholdSeis from '../../assets/foto6.jpg';

const InspeccionFotos = () => {
  const { id } = useParams();
  const inspeccion = useSelector((state) => state.inspeccion);
  const vehiculo = useSelector((state) => state.vehiculo);
  const vigencia = useSelector((state) => state.vigencia);
  const tarjeta = useSelector((state) => state.tarjeta);
  const coberturaSeleccionada = useSelector(
    (state) => state.coberturaSeleccionada,
  );
  const cliente = useSelector((state) => state.cliente);
  const dataVehiculo = useSelector((state) => state.dataVehiculo);
  const sumaAsegurada = useSelector((state) => state.sumaAsegurada);
  const [loading, setLoading] = useState(false);
  const [previewSrcUno, setPreviewSrcUno] = useState('');
  const [previewSrcDos, setPreviewSrcDos] = useState('');
  const [previewSrcTres, setPreviewSrcTres] = useState('');
  const [previewSrcCuatro, setPreviewSrcCuatro] = useState('');
  const [previewSrcCinco, setPreviewSrcCinco] = useState('');
  const [previewSrcSeis, setPreviewSrcSeis] = useState('');
  const [currentFoto, setCurrentFoto] = useState(1);
  const foto1Ref = useRef(null);
  const foto2Ref = useRef(null);
  const foto3Ref = useRef(null);
  const foto4Ref = useRef(null);
  const foto5Ref = useRef(null);
  const foto6Ref = useRef(null);
  const certRef = useRef(null);
  const [emitir, setEmitir] = useState(false);

  useEffect(() => {
    if (inspeccion.emitir) {
      setEmitir(true);
    } else {
      setEmitir(false);
    }
  }, []);

  const handleChangePhoto1 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto1').files[0];

    // const reader = new FileReader();

    // reader.onload = () => {
    //   setPreviewSrcUno(reader.result);
    //   setLoading(false);
    // };

    // reader.readAsDataURL(file);
  };

  const handleChangePhoto2 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto2').files[0];

    // if (file.size > 0) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     setPreviewSrcDos(reader.result);
    //     setLoading(false);
    //   };
    // }
  };

  const handleChangePhoto3 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto3').files[0];

    // if (file.size > 0) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     setPreviewSrcTres(reader.result);
    //     setLoading(false);
    //   };
    // }
  };

  const handleChangePhoto4 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto4').files[0];

    // if (file.size > 0) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     setPreviewSrcCuatro(reader.result);
    //     setLoading(false);
    //   };
    // }
  };

  const handleChangePhoto5 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto5').files[0];

    // if (file.size > 0) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     setPreviewSrcCinco(reader.result);
    //     setLoading(false);
    //   };
    // }
  };

  const handleChangePhoto6 = () => {
    // setLoading(true);
    // const file = document.getElementById('foto6').files[0];

    // if (file.size > 0) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     setPreviewSrcSeis(reader.result);
    //     setLoading(false);
    //   };
    // }
  };

  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleClickFinish = (e) => {
    e.preventDefault();

    const formDataInspeccion = new FormData();
    formDataInspeccion.append('cotizacion_id', id);
    formDataInspeccion.append(
      'foto1',
      foto1Ref.current.files[0],
      foto1Ref.current.files[0].name,
    );
    formDataInspeccion.append(
      'foto2',
      foto2Ref.current.files[0],
      foto2Ref.current.files[0].name,
    );
    formDataInspeccion.append(
      'foto3',
      foto3Ref.current.files[0],
      foto3Ref.current.files[0].name,
    );
    formDataInspeccion.append(
      'foto4',
      foto4Ref.current.files[0],
      foto4Ref.current.files[0].name,
    );
    formDataInspeccion.append(
      'foto5',
      foto5Ref.current.files[0],
      foto5Ref.current.files[0].name,
    );
    formDataInspeccion.append(
      'foto6',
      foto6Ref.current.files[0],
      foto6Ref.current.files[0].name,
    );

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formDataInspeccion,
      redirect: 'follow',
    };

    if (!emitir) {
      fetch(`${BASE_URL}/subir-inspecciones`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    } else {
      fetch(
        `${BASE_URL}/solicitar-emision?cotizacion_id=${coberturaSeleccionada.id}&tipo_documento=${cliente.dniElegido}&documento=${cliente.dniValue}&sexo=${cliente.sexo}&cuit=${cliente.CUILT}&situacion_afip=${cliente.condicionIVA}&iibb=${cliente.condicionIIBB}&patente=${dataVehiculo.patente}&chasis=${dataVehiculo.chasis}&motor=${dataVehiculo.motor}&anios_siniestros=0&calle=${cliente.calle}&numero=${cliente.nro}&vigencia_desde=${vigencia}&numero_tarjeta=${tarjeta.nroTarjeta}&telefono=${cliente.tel}&estado_civil=1&forma_pago=${tarjeta.idFormaPagoElegida}`,
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
          if (result.status) {
            fetch(`${BASE_URL}/subir-inspecciones`, requestOptions)
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.log('error', error));
          } else {
            console.log('Error al emitir');
          }
        })
        .catch((error) => console.log('error', error));
    }
  };

  const handleSubmitCertificado = (e) => {
    e.preventDefault();

    const formDataInspeccion = new FormData();
    formDataInspeccion.append('cotizacion_id', id);
    formDataInspeccion.append(
      'foto1',
      certRef.current.files[0],
      certRef.current.files[0].name,
    );

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formDataInspeccion,
      redirect: 'follow',
    };

    if (!emitir) {
      fetch(`${BASE_URL}/subir-inspecciones`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    } else {
      fetch(
        `${BASE_URL}/solicitar-emision?cotizacion_id=${coberturaSeleccionada.id}&tipo_documento=${cliente.dniElegido}&documento=${cliente.dniValue}&sexo=${cliente.sexo}&cuit=${cliente.CUILT}&situacion_afip=${cliente.condicionIVA}&iibb=${cliente.condicionIIBB}&patente=${dataVehiculo.patente}&chasis=${dataVehiculo.chasis}&motor=${dataVehiculo.motor}&anios_siniestros=0&calle=${cliente.calle}&numero=${cliente.nro}&vigencia_desde=${vigencia}&numero_tarjeta=${tarjeta.nroTarjeta}&telefono=${cliente.tel}&estado_civil=1&forma_pago=${tarjeta.idFormaPagoElegida}`,
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
          if (result.status) {
            fetch(`${BASE_URL}/subir-inspecciones`, requestOptions)
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.log('error', error));
          } else {
            console.log('Error al emitir');
          }
        })
        .catch((error) => console.log('error', error));
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
        {inspeccion.cotizacion.solicitud.okm ? (
          <>
            <Form onSubmit={handleSubmitCertificado}>
              <Content>
                <TextContent>Foto 1: Certificado de rodamiento</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcSeis ? (
                  <Img src={previewSrcSeis} />
                ) : (
                  <Img src={imgPlaceholdSeis} className="placehold" />
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
                        id="cert"
                        name="cert"
                        ref={certRef}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Btns>
                <BtnBack>
                  <Link to={`/inspeccion/${id}`}>Volver</Link>
                </BtnBack>

                <BtnContinue type="submit">Finalizar</BtnContinue>
              </Btns>
            </Form>
          </>
        ) : (
          <>
            <Form onSubmit={handleClickFinish}>
              <Content className={currentFoto === 1 ? 'visible' : 'hidden'}>
                <TextContent>Foto 1: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcUno ? (
                  <Img src={previewSrcUno} />
                ) : (
                  <Img src={imgPlaceholdUno} className="placehold" />
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
                        id="foto1"
                        name="foto1"
                        ref={foto1Ref}
                        onChange={handleChangePhoto1}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Content className={currentFoto === 2 ? 'visible' : 'hidden'}>
                <TextContent>Foto 2: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcDos ? (
                  <Img src={previewSrcDos} />
                ) : (
                  <Img src={imgPlaceholdDos} className="placehold" />
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
                        id="foto2"
                        name="foto2"
                        ref={foto2Ref}
                        onChange={handleChangePhoto2}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Content className={currentFoto === 3 ? 'visible' : 'hidden'}>
                <TextContent>Foto 3: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcTres ? (
                  <Img src={previewSrcTres} />
                ) : (
                  <Img src={imgPlaceholdTres} className="placehold" />
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
                        id="foto3"
                        name="foto3"
                        ref={foto3Ref}
                        onChange={handleChangePhoto3}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Content className={currentFoto === 4 ? 'visible' : 'hidden'}>
                <TextContent>Foto 4: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcCuatro ? (
                  <Img src={previewSrcCuatro} />
                ) : (
                  <Img src={imgPlaceholdCuatro} className="placehold" />
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
                        id="foto4"
                        name="foto4"
                        ref={foto4Ref}
                        onChange={handleChangePhoto4}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Content className={currentFoto === 5 ? 'visible' : 'hidden'}>
                <TextContent>Foto 5: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcCinco ? (
                  <Img src={previewSrcCinco} />
                ) : (
                  <Img src={imgPlaceholdCinco} className="placehold" />
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
                        id="foto5"
                        name="foto5"
                        ref={foto5Ref}
                        onChange={handleChangePhoto5}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Content className={currentFoto === 6 ? 'visible' : 'hidden'}>
                <TextContent>Foto 6: Título</TextContent>
                <TextContent>
                  Asegurate de que se vea todo el frente, el parabrisas completo
                  y la patente
                </TextContent>
                {previewSrcSeis ? (
                  <Img src={previewSrcSeis} />
                ) : (
                  <Img src={imgPlaceholdSeis} className="placehold" />
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
                        id="foto6"
                        name="foto6"
                        ref={foto6Ref}
                        onChange={handleChangePhoto6}
                      />
                      <FontAwesomeIcon icon={faCamera} />
                      Tomar foto
                    </>
                  )}
                </BtnCamera>
              </Content>

              <Btns>
                {currentFoto === 1 ? (
                  <BtnBack>
                    <Link to={`/inspeccion/${id}`}>Volver</Link>
                  </BtnBack>
                ) : (
                  <BtnBack onClick={() => setCurrentFoto(currentFoto - 1)}>
                    Volver
                  </BtnBack>
                )}

                {currentFoto < 6 ? (
                  <BtnContinue
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentFoto(currentFoto + 1);
                    }}
                  >
                    Siguiente
                  </BtnContinue>
                ) : (
                  <BtnContinue type="submit">Finalizar</BtnContinue>
                )}
              </Btns>
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default InspeccionFotos;

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

  &.visible {
    display: block;
  }

  &.hidden {
    display: none;
  }
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
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;

  & a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const BtnContinue = styled.button`
  background: var(--azul);
  border: 1px solid var(--azul);
  padding: 10px 20px;
  text-align: center;
  display: block;
  flex: 1;
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;

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

const Form = styled.form`
  display: block;
`;
