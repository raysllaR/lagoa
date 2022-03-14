/* eslint-disable react/destructuring-assignment */
import React from 'react';

function MessageError() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        className="MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded"
        style={{
          borderRadius: '13px', boxShadow: 'rgb(211, 217, 223) 0px 6px 17px', boxSizing: 'border-box', padding: '16px',
        }}
      >
        <div
          className="MuiCardContent-root"
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundSize: 'contain',
          }}
        >
          <img src="https://sofalta.eu/meuingresso/public/assets/images/arts/notfoundIngressos.svg" alt="img not found" style={{ width: '100%', maxHeight: '265px', opacity: '0.8' }} />
          <p style={{ textAlign: 'center', color: 'rgb(51, 51, 51)' }}>Oops, não conseguimos encontrar a página</p>
          <button
            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary"
            tabIndex="0"
            type="button"
            onClick={() => { window.location.href = '/'; }}
            style={{
              width: '220px', background: 'rgb(232, 85, 34)', color: 'white', fontWeight: '500', lineHeight: '1.75', borderRadius: '4px', letterSpacing: '0.02857em', textTransform: 'uppercase', padding: '6px 16px', cursor: 'pointer',
            }}
          >
            <span className="MuiButton-label">voltar para casa</span>
            <span className="MuiTouchRipple-root" />
          </button>

        </div>
        <div className="MuiCardActions-root MuiCardActions-spacing" style={{ padding: '8px 12px', boxSizing: 'border-box' }} />
      </div>
    </div>
  );
}

export default MessageError;
