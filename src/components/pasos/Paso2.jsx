import React from 'react';
import { useParams } from 'react-router-dom';

const Paso2 = () => {
  const { vehiculo } = useParams();
  return (
    <>
      <h1>Coverit</h1>
      <p>
        Paso2 -
        {' '}
        {vehiculo}
      </p>
    </>
  );
};

export default Paso2;
