import React from 'react';

const RainWithSunIcon = (props) => (
  <svg style={props.style} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="a" x1="99.45" y1="30.68" x2="232.64" y2="261.37" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f3f7fe"/>
        <stop offset="0.45" stopColor="#f3f7fe"/>
        <stop offset="1" stopColor="#deeafb"/>
      </linearGradient>
      <linearGradient id="b" x1="1381.32" y1="-1144.67" x2="1399.47" y2="-1097.39" gradientTransform="translate(-1189.41 1353.24) rotate(-9)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0b65ed"/>
        <stop offset="0.45" stopColor="#0a5ad4"/>
        <stop offset="1" stopColor="#0950bc"/>
      </linearGradient>
      <linearGradient id="e" x1="78" y1="63.35" x2="118" y2="132.65" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fbbf24"/>
        <stop offset="0.45" stopColor="#fbbf24"/>
        <stop offset="1" stopColor="#f59e0b"/>
      </linearGradient>
      <symbol id="g" viewBox="0 0 196 196">
        <circle cx="98" cy="98" r="40" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="4" fill="url(#e)"/>
        <path d="M98,31.38V6m0,184V164.62M145.11,50.89,163.05,33M33,163.05l17.94-17.94m0-94.22L33,33m130.1,130.1-17.94-17.94M6,98H31.38M190,98H164.62" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="12">
          <animateTransform attributeName="transform" additive="sum" type="rotate" values="0 98 98; 45 98 98" dur="6s" repeatCount="indefinite"/>
        </path>
      </symbol>
      <symbol id="h" viewBox="0 0 350 222">
        <path d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="6" fill="url(#a)"/>
      </symbol>
      <symbol id="f" viewBox="0 0 363 258">
        <use width="196" height="196" xlinkHref="#g"/>
        <use width="350" height="222" transform="translate(13 36)" xlinkHref="#h"/>
      </symbol>
      <symbol id="i" viewBox="0 0 129 57" overflow="visible">
        <path d="M8.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,8.5,56.5Z" stroke="#0a5ad4" strokeMiterlimit="10" fill="url(#b)" opacity="0">
          <animateTransform attributeName="transform" additive="sum" type="translate" values="0 -60; 0 60" begin="0s; x1.end+.33s" dur=".67s"/>
          <animate attributeName="opacity" values="0; 1; 0" begin="0s; y1.end+.33s" dur=".67s" keyTimes="0; .25; 1"/>
        </path>
        <path d="M64.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,64.5,56.5Z" stroke="#0a5ad4" strokeMiterlimit="10" fill="url(#c)" opacity="0">
          <animateTransform attributeName="transform" additive="sum" type="translate" values="0 -60; 0 60" begin=".33s; x2.end+.33s" dur=".67s"/>
          <animate attributeName="opacity" values="0; 1; 0" begin=".33s; y2.end+.33s" dur=".67s" keyTimes="0; .25; 1"/>
        </path>
        <path d="M120.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,120.5,56.5Z" stroke="#0a5ad4" strokeMiterlimit="10" fill="url(#d)" opacity="0">
          <animateTransform attributeName="transform" additive="sum" type="translate" values="0 -60; 0 60" begin="-.33s; x3.end+.33s" dur=".67s"/>
          <animate attributeName="opacity" values="0; 1; 0" begin="-.33s; y3.end+.33s" dur=".67s" keyTimes="0; .25; 1"/>
        </path>
      </symbol>
    </defs>
    <use width="363" height="258" transform="translate(68 109)" xlinkHref="#f"/>
    <use width="129" height="57" transform="translate(191.5 343.5)" xlinkHref="#i"/>
  </svg>
);

export default RainWithSunIcon;