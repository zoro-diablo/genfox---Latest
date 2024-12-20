import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className='button z-10'>
        <div className='button-overlay' />
        <span>
          Get in Touch{' '}
        
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

  .button {
    font-size: 17px;
    border-radius: 12px;
    background: linear-gradient(
      180deg,
      rgb(56, 56, 56) 0%,
      rgb(36, 36, 36) 66%,
      rgb(41, 41, 41) 100%
    );
    color: rgb(218, 218, 218);
    border: none;
    padding: 2px;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .button span {
    border-radius: 10px;
    padding: 0.8em 1.3em;
    padding-right: 1.2em;
    text-shadow: 0px 0px 20px #4b4b4b;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    color: inherit;
    transition: all 0.3s;
    background-color: rgb(29, 29, 29);
    background-image: radial-gradient(
        at 95% 89%,
        rgb(15, 15, 15) 0px,
        transparent 50%
      ),
      radial-gradient(at 0% 100%, rgb(17, 17, 17) 0px, transparent 50%),
      radial-gradient(at 0% 0%, rgb(29, 29, 29) 0px, transparent 50%);
  }

  .button:hover span {
    background-color: rgb(26, 25, 25);
  }

  .button-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-conic-gradient(
        rgb(48, 47, 47) 0.0000001%,
        rgb(51, 51, 51) 0.000104%
      )
      60% 60%/600% 600%;
    filter: opacity(10%) contrast(105%);
    -webkit-filter: opacity(10%) contrast(105%);
  }

  .button svg {
    width: 15px;
    height: 15px;
  }
`;

export default Button;
