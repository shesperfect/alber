import React, { useState } from 'react';

import { BasePrimitive } from '../base';

import './Window.scss';

export const Window = props => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [disabledPeriod, setDisabledPeriod] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const update = () => {
    if (disabledPeriod === 0) {
      setLoading(true);

      fetch(`https://source.unsplash.com/300x150/?beach`).then((response) => {
        setImageSrc(response.url);
        setLoading(false);
        setDisabledPeriod(5);

        const timerId = window.setInterval(() => {
          setDisabledPeriod(disabledPeriod - 1);

          if (disabledPeriod === 0) window.clearInterval(timerId);
        })
      });
    }
  };

  return (
    <BasePrimitive {...props}>
      <div className={ `window-wrapper ${disabledPeriod !== 0 ? 'disabled' : ''}` } onClick={ update }>
        <img src={ imageSrc } alt="" />

        { loading && (<div className="loader">Loading...</div>) }
        { disabledPeriod !== 0 && (<span className="interval">{ disabledPeriod }</span>) }
      </div>
    </BasePrimitive>
  );
};
