import React from "react";

const CloudyWithColdIcon = (props) => (
  <svg style={props.style} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="a" x1="99.45" y1="30.68" x2="232.64" y2="261.37" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f3f7fe"/>
        <stop offset="0.45" stopColor="#f3f7fe"/>
        <stop offset="1" stopColor="#deeafb"/> 
    </linearGradient>
    <linearGradient id="b" x1="11.38" y1="5.93" x2="32.82" y2="43.07" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#86c3db"/>
        <stop offset="0.45" stopColor="#86c3db"/>
        <stop offset="1" stopColor="#5eafcf"/> 
    </linearGradient>
    <linearGradient id="c" x1="67.38" y1="5.93" x2="88.82" y2="43.07" xlinkHref="#b"/>
    <linearGradient id="d" x1="123.38" y1="5.93" x2="144.82" y2="43.07" xlinkHref="#b"/>
      <symbol id="e" viewBox="0 0 350 222">
          <path d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="6" fill="url(#a)"/>
      </symbol>
      <symbol id="f" viewBox="0 0 156.2 49" overflow="visible">
          
          <g>
              <path d="M41.67,31l-5.78-3.3a13.74,13.74,0,0,0,0-6.47L41.67,18a4,4,0,0,0,1.49-5.46A4.08,4.08,0,0,0,37.62,11l-5.79,3.3a13.61,13.61,0,0,0-2.64-2,13.84,13.84,0,0,0-3-1.28V4.5a4.05,4.05,0,0,0-8.1,0v6.6a14.25,14.25,0,0,0-5.69,3.23L6.58,11A4.08,4.08,0,0,0,1,12.5,4,4,0,0,0,2.53,18l5.78,3.3a13.74,13.74,0,0,0,0,6.47L2.53,31A4,4,0,0,0,1,36.5a4.08,4.08,0,0,0,3.52,2,4,4,0,0,0,2-.54l5.79-3.3a13.61,13.61,0,0,0,2.64,2,13.8,13.8,0,0,0,3,1.27V44.5a4.05,4.05,0,0,0,8.1,0V37.89a14.22,14.22,0,0,0,5.68-3.23L37.62,38a4,4,0,0,0,2,.54,4.08,4.08,0,0,0,3.52-2A4,4,0,0,0,41.67,31ZM19.06,29.7a6,6,0,0,1-2.22-8.2,6.1,6.1,0,0,1,5.27-3,6.16,6.16,0,0,1,3,.8,6,6,0,0,1,2.22,8.2A6.12,6.12,0,0,1,19.06,29.7Z" stroke="#86c3db" strokeMiterlimit="10" fill="url(#b)" opacity="0">
                  <animateTransform
                      attributeName="transform"
                      additive="sum"
                      type="rotate"
                      values="0 24 24; 360 24 24"
                      dur="6s"
                      repeatCount="indefinite"/>

                  <animate
                      id="t1"
                      attributeName="opacity"
                      values="0; 1; 1; 0"
                      begin="0s; t1.end+1s"
                      dur="2s"
                      keyTimes="0; .17; .83; 1"/>
              </path>

              <animateTransform
                  id="s1"
                  attributeName="transform"
                  additive="sum"
                  type="translate"
                  values="0 -36; 0 92;"
                  begin="0s; s1.end+1s"
                  dur="2s"/>
          </g>

          <g>
              <path d="M97.67,31l-5.78-3.3a13.74,13.74,0,0,0,0-6.47L97.67,18a4,4,0,0,0,1.49-5.46A4.08,4.08,0,0,0,93.62,11l-5.79,3.3a13.61,13.61,0,0,0-2.64-2,13.84,13.84,0,0,0-3-1.28V4.5a4.05,4.05,0,0,0-8.1,0v6.6a14.25,14.25,0,0,0-5.69,3.23L62.58,11A4.08,4.08,0,0,0,57,12.5,4,4,0,0,0,58.53,18l5.78,3.3a13.74,13.74,0,0,0,0,6.47L58.53,31A4,4,0,0,0,57,36.5a4.08,4.08,0,0,0,3.52,2,4,4,0,0,0,2-.54l5.79-3.3a13.61,13.61,0,0,0,2.64,2,13.8,13.8,0,0,0,3,1.27V44.5a4.05,4.05,0,0,0,8.1,0V37.89a14.22,14.22,0,0,0,5.68-3.23L93.62,38a4,4,0,0,0,2,.54,4.08,4.08,0,0,0,3.52-2A4,4,0,0,0,97.67,31ZM75.06,29.7a6,6,0,0,1-2.22-8.2,6.1,6.1,0,0,1,5.27-3,6.16,6.16,0,0,1,3,.8,6,6,0,0,1,2.22,8.2A6.12,6.12,0,0,1,75.06,29.7Z" stroke="#86c3db" strokeMiterlimit="10" fill="url(#c)" opacity="0">
                  <animateTransform
                      attributeName="transform"
                      additive="sum"
                      type="rotate"
                      values="0 80 24; 360 80 24"
                      dur="6s"
                      repeatCount="indefinite"/>

                  <animate
                      id="t2"
                      attributeName="opacity"
                      values="0; 1; 1; 0"
                      begin="-.83s; t2.end+1s"
                      dur="2s"
                      keyTimes="0; .17; .83; 1"/>
              </path>

              <animateTransform
                  id="s2"
                  attributeName="transform"
                  additive="sum"
                  type="translate"
                  values="0 -36; 0 92;"
                  begin="-.83s; s2.end+1s"
                  dur="2s"/>
          </g>

          <g>
              <path d="M153.67,31l-5.78-3.3a13.74,13.74,0,0,0,0-6.47L153.67,18a4,4,0,0,0,1.49-5.46A4.08,4.08,0,0,0,149.62,11l-5.79,3.3a13.61,13.61,0,0,0-2.64-2,13.84,13.84,0,0,0-3-1.28V4.5a4.05,4.05,0,0,0-8.1,0v6.6a14.25,14.25,0,0,0-5.69,3.23L118.58,11A4.08,4.08,0,0,0,113,12.5,4,4,0,0,0,114.53,18l5.78,3.3a13.74,13.74,0,0,0,0,6.47L114.53,31A4,4,0,0,0,113,36.5a4.08,4.08,0,0,0,3.52,2,4,4,0,0,0,2-.54l5.79-3.3a13.61,13.61,0,0,0,2.64,2,13.8,13.8,0,0,0,3,1.27V44.5a4.05,4.05,0,0,0,8.1,0V37.89a14.22,14.22,0,0,0,5.68-3.23l5.79,3.3a4,4,0,0,0,2,.54,4.08,4.08,0,0,0,3.52-2A4,4,0,0,0,153.67,31ZM131.06,29.7a6,6,0,0,1-2.22-8.2,6.1,6.1,0,0,1,5.27-3,6.16,6.16,0,0,1,3,.8,6,6,0,0,1,2.22,8.2A6.12,6.12,0,0,1,131.06,29.7Z" stroke="#86c3db" strokeMiterlimit="10" fill="url(#d)" opacity="0">
                  <animateTransform
                      attributeName="transform"
                      additive="sum"
                      type="rotate"
                      values="0 136 24; 360 136 24"
                      dur="6s"
                      repeatCount="indefinite"/>

                  <animate
                      id="t3"
                      attributeName="opacity"
                      values="0; 1; 1; 0"
                      begin=".83s; t3.end+1s"
                      dur="2s"
                      keyTimes="0; .17; .83; 1"/>
              </path>

              <animateTransform
                  id="s3"
                  attributeName="transform"
                  additive="sum"
                  type="translate"
                  values="0 -36; 0 92;"
                  begin=".83s; s3.end+1s"
                  dur="2s"/>
          </g>
      </symbol>
  </defs>
  <use width="350" height="222" transform="translate(81 145)" xlinkHref="#e"/>
  <use width="156.2" height="49" transform="translate(177.9 337.5)" xlinkHref="#f"/>
</svg>

);

export default CloudyWithColdIcon;