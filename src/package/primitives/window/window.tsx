import React, { FunctionComponent, useEffect, useState } from 'react';

import { BasePrimitive, BasePrimitiveProps } from '../base';

import './Window.scss';

const DISABLED_TIME_IN_SEC = 5;

export const Window: FunctionComponent<BasePrimitiveProps> = props => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [disabledPeriod, setDisabledPeriod] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  function query(): Promise<Response> {
    return fetch(`https://source.unsplash.com/300x150/?beach`);
  }

  function update() {
    if (disabledPeriod === 0) {
      setLoading(true);

      query().then((response) => {
        setImageSrc(response.url);
        setLoading(false);
        setDisabledPeriod(DISABLED_TIME_IN_SEC);
      });
    }
  }

  useEffect(() => update(), []);
  useEffect(() => {
    let timerId;

    if (imageSrc) {
      let time = DISABLED_TIME_IN_SEC;

      timerId = window.setInterval(() => {
        setDisabledPeriod(--time);

        // @ts-ignore
        if (time === 0) window.clearInterval(timerId);
      }, 1000)
    }

    return () => window.clearInterval(timerId);
  }, [imageSrc]);



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
