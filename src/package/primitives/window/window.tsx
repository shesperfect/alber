import React, { useEffect, useState } from 'react';

import { BasePrimitive } from '../base';

import './Window.scss';

const DISABLED_TIME_IN_SEC = 5;

export const Window = props => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [disabledPeriod, setDisabledPeriod] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  function query(): Promise<Response> {
    return fetch(`https://source.unsplash.com/300x150/?beach`);
  }

  useEffect(() => update(), []);
  useEffect(() => {
    if (imageSrc) {
      let time = DISABLED_TIME_IN_SEC;

      const timerId = window.setInterval(() => {
        setDisabledPeriod(--time);

        // @ts-ignore
        if (time === 0) window.clearInterval(timerId);
      }, 1000)
    }

  }, [imageSrc]);

  const update = () => {
    if (disabledPeriod === 0) {
      setLoading(true);

      query().then((response) => {
        setImageSrc(response.url);
        setLoading(false);
        setDisabledPeriod(DISABLED_TIME_IN_SEC);
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
