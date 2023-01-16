let usedImages = [];
let teams = [];
let scores = [];
let initial;
const languages = [
  {
    name: "danish",
    flag: "./assets/flags/danish.png",
    text: [
      "Tilføj bane/hold/spiller",
      "Tilføj hold/spiller",
      "Nulstil",
      "Ny",
      "Tilføj figur",
      "Ja",
      "Vælg figur",
      "Ok",
      "Tilføj navn",
      "nej",
      "Er du sikker?",
    ],
  },
  {
    name: "english",
    flag: "./assets/flags/english.png",
    text: [
      "Add new track/team/player",
      "Add new Team/player",
      "Reset",
      "New",
      "Add avatar",
      "Yes",
      "Choose Avatar",
      "Ok",
      "Add name",
      "No",
      "Are you sure ?",
    ],
  },
];
let activeLanguage = "danish";
let activeLanguageIndex = 0;

class LinearTeam {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.avatarUrl = "";
    this.id = Date.now();
    this.score = 0;
    this.maxSore = 10;
    this.otherScores = [];
    this.otherSameScores = [];
    this.hexBlocks = [];
    this.activeImg = 0;
    this.leftSvg = `<svg
    height="800px"
    width="800px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xml:space="preserve"
  >
    <path
      style="fill: #8ae9ff"
      d="M326.439,21.24L136.494,234.106c-11.131,12.474-11.131,31.315,0,43.789l189.945,212.866
   c20.112,22.539,57.421,8.313,57.421-21.895V43.134C383.861,12.927,346.551-1.299,326.439,21.24z"
    />
    <g>
      <path
        style="fill: #248a9c"
        d="M350.833,512c-11.992,0-23.618-5.049-32.004-14.448L128.885,284.687
       c-14.593-16.353-14.593-41.019-0.001-57.372L318.829,14.449l0,0c12.005-13.455,30.65-17.998,47.497-11.572
       c16.849,6.425,27.734,22.227,27.734,40.258v425.732c0,18.032-10.887,33.834-27.734,40.259C361.248,511.062,356.005,512,350.833,512
       z M326.439,21.24l7.61,6.791L144.104,240.896c-7.683,8.61-7.683,21.597,0.001,30.207l189.944,212.865
       c7.672,8.601,17.951,8.782,25.009,6.094c7.06-2.693,14.603-9.674,14.603-21.197V43.135c0-11.523-7.544-18.505-14.603-21.196
       c-7.058-2.692-17.336-2.504-25.009,6.093L326.439,21.24z"
      />
      <path
        style="fill: #248a9c"
        d="M277.259,395.739c-2.806,0-5.6-1.151-7.615-3.409l-4.67-5.234c-3.75-4.203-3.382-10.651,0.82-14.402
       c4.205-3.75,10.653-3.381,14.402,0.82l4.669,5.234c3.75,4.203,3.382,10.651-0.82,14.402
       C282.101,394.885,279.675,395.739,277.259,395.739z"
      />
      <path
        style="fill: #248a9c"
        d="M249.125,364.21c-2.806,0-5.599-1.151-7.614-3.409l-85.937-96.307
       c-3.752-4.203-3.383-10.651,0.819-14.401c4.204-3.752,10.651-3.383,14.401,0.819l85.937,96.307
       c3.751,4.203,3.383,10.651-0.819,14.401C253.967,363.356,251.54,364.21,249.125,364.21z"
      />
    </g>
    </svg>`;
    this.rightSvg = `<svg
  height="800px"
  width="800px"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 512 512"
  xml:space="preserve"
>
  <path
    style="fill: #8ae9ff"
    d="M185.561,490.761l189.945-212.866c11.131-12.474,11.131-31.315,0-43.789L185.561,21.241
 c-20.112-22.539-57.421-8.313-57.421,21.895v425.731C128.14,499.073,165.449,513.3,185.561,490.761z"
  />
  <g>
    <path
      style="fill: #248a9c"
      d="M161.167,512c-5.174,0-10.414-0.94-15.494-2.876c-16.848-6.425-27.734-22.226-27.734-40.258V43.135
     c0-18.031,10.886-33.834,27.734-40.258c16.849-6.425,35.491-1.883,47.497,11.573l189.947,212.865
     c14.592,16.353,14.592,41.019,0,57.372L193.171,497.552l0,0C184.785,506.951,173.158,512,161.167,512z M161.285,20.407
     c-3.009,0-5.872,0.59-8.341,1.531c-7.059,2.693-14.603,9.674-14.603,21.196v425.732c0,11.523,7.544,18.505,14.603,21.196
     c7.059,2.691,17.336,2.505,25.008-6.093l189.945-212.865c7.684-8.61,7.684-21.597,0-30.207L177.951,28.032
     C172.964,22.442,166.874,20.407,161.285,20.407z"
    />
    <path
      style="fill: #248a9c"
      d="M239.419,141.895c-2.805,0-5.599-1.151-7.613-3.409l-4.669-5.233
     c-3.75-4.202-3.384-10.65,0.819-14.401c4.202-3.752,10.65-3.384,14.401,0.819l4.669,5.233c3.75,4.202,3.384,10.65-0.819,14.401
     C244.261,141.041,241.835,141.895,239.419,141.895z"
    />
    <path
      style="fill: #248a9c"
      d="M348.82,264.498c-2.806,0-5.599-1.151-7.614-3.409l-85.937-96.307
     c-3.75-4.203-3.383-10.651,0.82-14.401c4.202-3.751,10.651-3.382,14.401,0.819l85.937,96.307c3.75,4.203,3.383,10.651-0.819,14.401
     C353.663,263.645,351.237,264.498,348.82,264.498z"
    />
  </g>
    </svg>`;
    this.addSvg = `<svg
height="800px"
width="800px"
version="1.1"
id="Layer_1"
viewBox="0 0 512 512"
xml:space="preserve"
sodipodi:docname="plus-svgrepo-com.svg"
inkscape:version="1.2.2 (732a01da63, 2022-12-09)"
xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
xmlns="http://www.w3.org/2000/svg"
xmlns:svg="http://www.w3.org/2000/svg"
>
<defs id="defs153" />
<sodipodi:namedview
  id="namedview151"
  pagecolor="#505050"
  bordercolor="#ffffff"
  borderopacity="1"
  inkscape:showpageshadow="0"
  inkscape:pageopacity="0"
  inkscape:pagecheckerboard="1"
  inkscape:deskcolor="#505050"
  showgrid="false"
  inkscape:zoom="1.03625"
  inkscape:cx="399.51749"
  inkscape:cy="399.51749"
  inkscape:window-width="1920"
  inkscape:window-height="1009"
  inkscape:window-x="-8"
  inkscape:window-y="-8"
  inkscape:window-maximized="1"
  inkscape:current-layer="g148"
/>
<path
  style="fill: #8ae9ff; fill-opacity: 1"
  d="M10.199,226.457v59.086c0,11.593,9.399,20.991,20.991,20.991h153.284  c11.593,0,20.991,9.399,20.991,20.991v153.284c0,11.593,9.399,20.991,20.991,20.991h59.086c11.593,0,20.991-9.399,20.991-20.991  V327.525c0-11.593,9.399-20.991,20.991-20.991h153.284c11.593,0,20.991-9.399,20.991-20.991v-59.086  c0-11.593-9.399-20.991-20.991-20.991H327.524c-11.593,0-20.991-9.399-20.991-20.991V31.191c0-11.593-9.399-20.991-20.991-20.991  h-59.086c-11.593,0-20.991,9.399-20.991,20.991v153.284c0,11.593-9.399,20.991-20.991,20.991H31.19  C19.598,205.466,10.199,214.864,10.199,226.457z"
  id="path140"
/>
<g id="g148">
  <path
    style="fill: #248a9c; fill-opacity: 1"
    d="M285.543,512h-59.086c-17.198,0-31.19-13.992-31.19-31.19V327.526   c0-5.951-4.842-10.793-10.793-10.793H31.19c-17.198,0-31.19-13.992-31.19-31.19v-59.086c0-17.198,13.992-31.19,31.19-31.19h153.284   c5.951,0,10.793-4.842,10.793-10.793V31.19c0-17.198,13.992-31.19,31.19-31.19h59.086c17.198,0,31.19,13.992,31.19,31.19v153.284   c0,5.951,4.842,10.793,10.793,10.793H480.81c17.198,0,31.19,13.992,31.19,31.19v59.086c0,17.198-13.992,31.19-31.19,31.19H327.526   c-5.951,0-10.793,4.842-10.793,10.793V480.81C316.733,498.008,302.741,512,285.543,512z M31.19,215.665   c-5.95,0-10.792,4.842-10.792,10.792v59.086c0,5.95,4.842,10.792,10.792,10.792h153.284c17.199,0,31.191,13.992,31.191,31.191   V480.81c0,5.95,4.842,10.792,10.792,10.792h59.086c5.95,0,10.792-4.842,10.792-10.792V327.526   c0-17.199,13.992-31.191,31.191-31.191H480.81c5.95,0,10.792-4.842,10.792-10.792v-59.086c0-5.95-4.842-10.792-10.792-10.792   H327.526c-17.199,0-31.191-13.992-31.191-31.191V31.19c0-5.95-4.842-10.792-10.792-10.792h-59.086   c-5.95,0-10.792,4.842-10.792,10.792v153.284c0,17.199-13.992,31.191-31.191,31.191H31.19z"
    id="path142"
  />
  <path
    style="fill: #248a9c; fill-opacity: 1"
    d="M472.223,245.801h-95.909c-5.632,0-10.199-4.567-10.199-10.199c0-5.632,4.567-10.199,10.199-10.199   h95.909c5.632,0,10.199,4.567,10.199,10.199C482.422,241.234,477.855,245.801,472.223,245.801z"
    id="path144"
  />
  <path
    style="fill: #248a9c; fill-opacity: 1"
    d="M345.753,245.801h-7.992c-5.632,0-10.199-4.567-10.199-10.199c0-5.632,4.567-10.199,10.199-10.199   h7.992c5.632,0,10.199,4.567,10.199,10.199C355.952,241.234,351.385,245.801,345.753,245.801z"
    id="path146"
  />
</g>
    </svg>`;
    this.addAvatarSvg = `<svg
    height="800"
    width="800"
    class="add-button-svg"
    version="1.1"
    id="Layer_1"
    viewBox="0 0 512 512"
    xml:space="preserve"
    sodipodi:docname="plus-svgrepo-com.svg"
    inkscape:version="1.2.2 (732a01da63, 2022-12-09)"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"><defs
    id="defs153" /><sodipodi:namedview
    id="namedview151"
    pagecolor="#505050"
    bordercolor="#ffffff"
    borderopacity="1"
    inkscape:showpageshadow="0"
    inkscape:pageopacity="0"
    inkscape:pagecheckerboard="1"
    inkscape:deskcolor="#505050"
    showgrid="false"
    inkscape:zoom="1.03625"
    inkscape:cx="399.51749"
    inkscape:cy="553.92039"
    inkscape:window-width="1920"
    inkscape:window-height="1009"
    inkscape:window-x="-8"
    inkscape:window-y="-8"
    inkscape:window-maximized="1"
    inkscape:current-layer="g148" />
 <path
    style="fill:#63dc7d;fill-opacity:1"
    d="m 10.199,226.457 v 59.086 c 0,11.593 9.399,20.991 20.991,20.991 h 153.284 c 11.593,0 20.991,9.399 20.991,20.991 v 153.284 c 0,11.593 9.399,20.991 20.991,20.991 h 59.086 c 11.593,0 20.991,-9.399 20.991,-20.991 V 327.525 c 0,-11.593 9.399,-20.991 20.991,-20.991 h 153.284 c 11.593,0 20.991,-9.399 20.991,-20.991 v -59.086 c 0,-11.593 -9.399,-20.991 -20.991,-20.991 H 327.524 c -11.593,0 -20.991,-9.399 -20.991,-20.991 V 31.191 c 0,-11.593 -9.399,-20.991 -20.991,-20.991 h -59.086 c -11.593,0 -20.991,9.399 -20.991,20.991 v 153.284 c 0,11.593 -9.399,20.991 -20.991,20.991 H 31.19 c -11.592,0 -20.991,9.398 -20.991,20.991 z"
    id="path140" />
 <g
    id="g148">
   <path
    style="fill:#196d2a;fill-opacity:1"
    d="m 285.543,512 h -59.086 c -17.198,0 -31.19,-13.992 -31.19,-31.19 V 327.526 c 0,-5.951 -4.842,-10.793 -10.793,-10.793 H 31.19 C 13.992,316.733 0,302.741 0,285.543 v -59.086 c 0,-17.198 13.992,-31.19 31.19,-31.19 h 153.284 c 5.951,0 10.793,-4.842 10.793,-10.793 V 31.19 C 195.267,13.992 209.259,0 226.457,0 h 59.086 c 17.198,0 31.19,13.992 31.19,31.19 v 153.284 c 0,5.951 4.842,10.793 10.793,10.793 H 480.81 c 17.198,0 31.19,13.992 31.19,31.19 v 59.086 c 0,17.198 -13.992,31.19 -31.19,31.19 H 327.526 c -5.951,0 -10.793,4.842 -10.793,10.793 V 480.81 c 0,17.198 -13.992,31.19 -31.19,31.19 z M 31.19,215.665 c -5.95,0 -10.792,4.842 -10.792,10.792 v 59.086 c 0,5.95 4.842,10.792 10.792,10.792 h 153.284 c 17.199,0 31.191,13.992 31.191,31.191 V 480.81 c 0,5.95 4.842,10.792 10.792,10.792 h 59.086 c 5.95,0 10.792,-4.842 10.792,-10.792 V 327.526 c 0,-17.199 13.992,-31.191 31.191,-31.191 H 480.81 c 5.95,0 10.792,-4.842 10.792,-10.792 v -59.086 c 0,-5.95 -4.842,-10.792 -10.792,-10.792 H 327.526 c -17.199,0 -31.191,-13.992 -31.191,-31.191 V 31.19 c 0,-5.95 -4.842,-10.792 -10.792,-10.792 h -59.086 c -5.95,0 -10.792,4.842 -10.792,10.792 v 153.284 c 0,17.199 -13.992,31.191 -31.191,31.191 z"
    id="path142" />
   <path
    style="fill:#196d2a;fill-opacity:1"
    d="m 472.223,245.801 h -95.909 c -5.632,0 -10.199,-4.567 -10.199,-10.199 0,-5.632 4.567,-10.199 10.199,-10.199 h 95.909 c 5.632,0 10.199,4.567 10.199,10.199 0,5.632 -4.567,10.199 -10.199,10.199 z"
    id="path144" />
   <path
    style="fill:#196d2a;fill-opacity:1"
    d="m 345.753,245.801 h -7.992 c -5.632,0 -10.199,-4.567 -10.199,-10.199 0,-5.632 4.567,-10.199 10.199,-10.199 h 7.992 c 5.632,0 10.199,4.567 10.199,10.199 0,5.632 -4.567,10.199 -10.199,10.199 z"
    id="path146" />
 </g>
    </svg>`;

    this.iWin = {
      english: `<svg
  width="207.41353mm"
  height="112.50523mm"
  viewBox="0 0 207.41353 112.50523"
  version="1.1"
  id="svg345"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg">
 <defs
    id="defs342">
   <rect
      x="176.17418"
      y="110.10887"
      width="491.1813"
      height="194.36607"
      id="rect947" />
 </defs>
 <g
    id="layer1"
    transform="translate(-0.66527356,-0.49337159)">
   <path
      id="path25595"
      style="fill:#ffffff;fill-opacity:1;stroke:#8ae9ff;stroke-width:2.96677;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1"
      d="m 111.51842,2.0044235 a 92.153935,54.769224 0 0 1 6.24467,0.0078 A 92.153935,54.769224 0 0 1 206.56826,58.06259 92.153935,54.769224 0 0 1 113.33372,111.51117 92.153935,54.769224 0 0 1 27.1874,74.30958 L 3.6478599,62.43624 23.02167,49.95435 A 92.153935,54.769224 0 0 1 111.51842,2.0044235 Z" />
   <text
      xml:space="preserve"
      transform="matrix(0.3089518,0,0,0.3089518,-15.356457,0.02114547)"
      id="text945"
      style="font-size:120px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;white-space:pre;shape-inside:url(#rect947);fill:#000000;stroke:#8ae9ff;stroke-width:11.3386;stroke-linecap:square"><tspan
        x="208.4541"
        y="218.19991"
        id="tspan6712"><tspan
          style="stroke:#000000"
          id="tspan6710">I WON !</tspan></tspan></text>
 </g>
</svg>
`,
      danish: `<svg
      width="207.41353mm"
      height="112.50523mm"
      viewBox="0 0 207.41353 112.50523"
      version="1.1"
      id="svg345"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
     <defs
        id="defs342">
       <rect
          x="176.17418"
          y="110.10887"
          width="707.19843"
          height="129.1983"
          id="rect947-2" />
     </defs>
     <g
        id="layer1"
        transform="translate(-0.66527356,-0.49337159)">
       <path
          id="path25595"
          style="fill:#ffffff;fill-opacity:1;stroke:#8ae9ff;stroke-width:2.96677;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1"
          d="m 111.51842,2.0044235 a 92.153935,54.769224 0 0 1 6.24467,0.0078 A 92.153935,54.769224 0 0 1 206.56826,58.06259 92.153935,54.769224 0 0 1 113.33372,111.51117 92.153935,54.769224 0 0 1 27.1874,74.30958 L 3.6478599,62.43624 23.02167,49.95435 A 92.153935,54.769224 0 0 1 111.51842,2.0044235 Z" />
       <text
          xml:space="preserve"
          transform="matrix(0.27636066,0,0,0.27636066,-29.655751,9.7370512)"
          id="text945"
          style="font-size:94.3665px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;letter-spacing:6.1928px;white-space:pre;shape-inside:url(#rect947-2);fill:#000000;stroke:#8ae9ff;stroke-width:11.3386;stroke-linecap:square"><tspan
            x="240.13095"
            y="196.20279"
            id="tspan8850"><tspan
              style="font-family:sans-serif;-inkscape-font-specification:sans-serif;stroke:#000000"
              id="tspan8848">jeg vandt !</tspan></tspan></text>
     </g>
   </svg>
   `,
    };
    this.iWinLinear = {
      english: `<svg
  width="207.41353mm"
  height="112.5052mm"
  viewBox="0 0 207.41353 112.5052"
  version="1.1"
  id="svg25394"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg">
 <defs
    id="defs25391">
   <rect
      x="176.17418"
      y="110.10887"
      width="491.1813"
      height="194.36607"
      id="rect947" />
 </defs>
 <g
    id="layer1"
    transform="translate(-2.0568164,-0.49080162)">
   <path
      id="path25595"
      style="fill:#ffffff;fill-opacity:1;stroke:#8ae9ff;stroke-width:2.96677;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1"
      d="M 98.617187,2.0018687 A 92.153935,54.769224 0 0 0 92.372519,2.0096363 92.153935,54.769224 0 0 0 3.5673559,58.06 92.153935,54.769224 0 0 0 96.801889,111.50858 92.153935,54.769224 0 0 0 182.94821,74.30699 L 206.48775,62.433656 187.11394,49.951761 A 92.153935,54.769224 0 0 0 98.617187,2.0018687 Z" />
   <text
      xml:space="preserve"
      transform="matrix(0.26458333,0,0,0.26458333,-13.67983,8.6132261)"
      id="text945"
      style="font-size:120px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;white-space:pre;shape-inside:url(#rect947);fill:#000000;stroke:#8ae9ff;stroke-width:11.3386;stroke-linecap:square"><tspan
        x="208.4541"
        y="218.19991"
        id="tspan1141"><tspan
          style="stroke:#000000"
          id="tspan1139">I WON !</tspan></tspan></text>
 </g>
</svg>`,
      danish: `<svg
      width="207.41353mm"
      height="112.5052mm"
      viewBox="0 0 207.41353 112.5052"
      version="1.1"
      id="svg25394"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
     <defs
        id="defs25391">
       <rect
          x="176.17418"
          y="110.10887"
          width="707.19843"
          height="129.1983"
          id="rect947" />
     </defs>
     <g
        id="layer1"
        transform="translate(-2.0568164,-0.49080162)">
       <path
          id="path25595"
          style="fill:#ffffff;fill-opacity:1;stroke:#8ae9ff;stroke-width:2.96677;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1"
          d="M 98.617187,2.0018687 A 92.153935,54.769224 0 0 0 92.372519,2.0096363 92.153935,54.769224 0 0 0 3.5673559,58.06 92.153935,54.769224 0 0 0 96.801889,111.50858 92.153935,54.769224 0 0 0 182.94821,74.30699 L 206.48775,62.433656 187.11394,49.951761 A 92.153935,54.769224 0 0 0 98.617187,2.0018687 Z" />
       <text
          xml:space="preserve"
          transform="matrix(0.27636066,0,0,0.27636066,-44.316305,9.7344711)"
          id="text945"
          style="font-size:94.3665px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;letter-spacing:6.1928px;white-space:pre;shape-inside:url(#rect947);fill:#000000;stroke:#8ae9ff;stroke-width:11.3386;stroke-linecap:square"><tspan
            x="240.13095"
            y="196.20279"
            id="tspan9247"><tspan
              style="font-family:sans-serif;-inkscape-font-specification:sans-serif;stroke:#000000"
              id="tspan9245">jeg vandt !</tspan></tspan></text>
     </g>
   </svg>`,
    };
  }

  create(container, containerHex) {
    // Create container for team
    this.teamContainer = document.createElement("div");
    this.teamContainer.setAttribute(
      "class",
      `linear-team-container team-${this.number}`
    );
    this.teamContainer.setAttribute("id", `team-${this.number}`);

    // 👷‍♂️ Create name field ✍️
    this.teamNameContainer = document.createElement("div");
    this.teamNameContainer.setAttribute("class", "linear-team-name");
    this.teamNameContainer.setAttribute("id", `team-name-${this.number}`);
    this.teamName = document.createElement("h1");
    this.teamName.setAttribute("class", "text-change-8");
    this.teamName.innerHTML = this.name;
    this.teamName.setAttribute("contentEditable", "true");
    this.teamNameContainer.appendChild(this.teamName);
    // Add to parent
    this.teamContainer.appendChild(this.teamNameContainer);

    // 👷‍♂️ Create buttons to move 🏃‍♂️
    this.moveButtonsContainer = document.createElement("div");
    this.moveButtonsContainer.setAttribute("class", "hideElement");
    // Left
    this.leftMoveButton = document.createElement("div");
    this.leftMoveButton.setAttribute("class", "linear-move-button");
    this.leftMoveButton.setAttribute("id", `linear-move-down-${this.number}`);
    this.leftMoveButton.innerHTML = this.leftSvg;
    // Right
    this.rightMoveButton = document.createElement("div");
    this.rightMoveButton.setAttribute("class", "linear-move-button");
    this.rightMoveButton.setAttribute("id", `linear-move-up-${this.number}`);
    this.rightMoveButton.innerHTML = this.rightSvg;
    // Add to parent
    this.moveButtonsContainer.appendChild(this.leftMoveButton);
    this.moveButtonsContainer.appendChild(this.rightMoveButton);
    // Add to parent
    this.teamContainer.appendChild(this.moveButtonsContainer);

    // 👷‍♂️ Create add Avatar Button ➕
    this.addAvatarButton = document.createElement("div");
    this.addAvatarButton.setAttribute("class", "linear-add-button");
    this.addAvatarButton.setAttribute("id", `linear-add-button-${this.number}`);
    this.linearAddText = document.createElement("h4");
    this.linearAddText.setAttribute("class", `add-text-h1 text-change-4`);
    this.linearAddText.innerHTML = `${languages[activeLanguageIndex].text[4]}`;
    this.addAvatarButton.innerHTML = `${this.addAvatarSvg}`;
    this.addAvatarButton.appendChild(this.linearAddText);
    this.addAvatarButton.style.display = "flex";
    // Add to parent
    this.teamContainer.appendChild(this.addAvatarButton);

    // 👷‍♂️ Create Avatar 🧔
    this.avatarContainer = document.createElement("div");
    this.avatarContainer.setAttribute("class", "linear-avatar ");
    this.avatarContainer.setAttribute("id", `linear-avatar-${this.number} `);
    // Img tag 🖼️
    this.avatar = document.createElement("img");
    this.avatar.setAttribute("class", "liner-avatar-image hideElement");
    // Add to parent
    this.avatarContainer.appendChild(this.avatar);
    this.teamContainer.append(this.avatarContainer);
    // {TODO: Add src while adding avatar}

    // 👷‍♂️ Create race track container 🏁
    this.raceTrackContainer = document.createElement("div");
    this.raceTrackContainer.setAttribute("class", "linear-track");

    // 👷‍♂️ Create race track blocks 🟧
    this.blocksArray = [];
    for (let i = 0; i < this.maxSore; i++) {
      const block = document.createElement("div");
      if (i === this.maxSore - 1) {
        block.setAttribute(
          "class",
          `linear-block linear-block-${this.number}-${i} linear-finish`
        );
        const imageFlag = document.createElement("img");
        imageFlag.setAttribute("class", "finish-flag");
        imageFlag.setAttribute("src", "./assets/finish-bg.png");
        block.appendChild(imageFlag);
      } else {
        block.setAttribute(
          "class",
          `linear-block linear-block-${this.number}-${i}`
        );
      }
      block.setAttribute("id", `linear-block-${this.number}-${i}`);
      this.blocksArray.push(block);
      this.raceTrackContainer.appendChild(block);
    }
    // Add to parent
    this.teamContainer.appendChild(this.raceTrackContainer);

    // 👷‍♂️ Create delete button for team ❌
    this.linearDelTem = document.createElement("div");
    this.linearDelTem.setAttribute("class", "del-element");
    this.linearDelTem.addEventListener("click", () => {
      const confModal = document.getElementById("conformation-modal");
      confModal.classList.remove("hideElement");
      const confButtons = document.getElementById("confirm-buttons");
      const confYes = document.createElement("button");
      confYes.setAttribute("class", "confirm-yes");
      confYes.setAttribute("id", "confirm-yes");
      confYes.innerHTML = languages[activeLanguageIndex].text[5];
      confButtons.insertBefore(confYes, confButtons.firstChild);
      confYes.addEventListener("click", () => {
        this.remove();
        confButtons.removeChild(confButtons.firstElementChild);
        confModal.classList.add("hideElement");
      });
    });
    this.linearDelTem.innerHTML = "X";
    this.teamContainer.appendChild(this.linearDelTem);

    container.appendChild(this.teamContainer);

    // 👷‍♂️ Create for the hex page
    this.hexControlTeamCont = document.createElement("div");
    this.hexControlTeamCont.setAttribute("class", "hex-control-team");
    this.hexControlTeamCont.setAttribute("id", "hex-control-team");

    // 👷‍♂️ Create buttons container
    this.hexButtonsCont = document.createElement("div");
    this.hexButtonsCont.setAttribute("class", "hex-move-buttons");
    this.hexButtonsCont.setAttribute("id", "hex-move-buttons");

    // 👷‍♂️ Create buttons
    this.hexButtonLeft = document.createElement("div");
    this.hexButtonLeft.setAttribute("class", "hex-move-button");
    this.hexButtonLeft.setAttribute("class", "hex-move-down");
    this.hexButtonLeft.innerHTML = this.leftSvg;

    this.hexButtonRight = document.createElement("div");
    this.hexButtonRight.setAttribute("class", "hex-move-button");
    this.hexButtonRight.setAttribute("class", "hex-move-up");
    this.hexButtonRight.innerHTML = this.rightSvg;

    // Add to parent
    this.hexButtonsCont.appendChild(this.hexButtonLeft);
    this.hexButtonsCont.appendChild(this.hexButtonRight);
    this.hexControlTeamCont.appendChild(this.hexButtonsCont);

    // 👷‍♂️ Create team name
    this.hexTeamNameCont = document.createElement("div");
    this.hexTeamNameCont.setAttribute("class", "hex-teamName-cont");
    this.hexTeamNameCont.setAttribute("id", "hex-teamName-cont");
    this.hexTeamName = document.createElement("h1");
    this.hexTeamName.setAttribute("class", "text-change-8");
    this.hexTeamName.innerHTML = this.name;
    this.hexTeamName.setAttribute("contentEditable", "true");

    // Add to parent
    this.hexTeamNameCont.appendChild(this.hexTeamName);
    this.hexControlTeamCont.appendChild(this.hexTeamNameCont);

    // 👷‍♂️ Create Avatar 🧔
    this.hexAvatarContainer = document.createElement("div");
    this.hexAvatarContainer.setAttribute("class", "hex-avatar-cont");
    this.hexAvatarContainer.setAttribute("id", `hex-avatar-cont`);
    // Img tag 🖼️
    this.hexAvatar = document.createElement("img");
    // Add to parent
    this.hexAvatarContainer.innerHTML = `${this.addAvatarSvg}`;
    this.hexAddText = document.createElement("h4");
    this.hexAddText.setAttribute("class", `add-text-h1 text-change-4`);
    this.hexAddText.innerHTML = `${languages[activeLanguageIndex].text[4]}`;
    this.hexAvatarContainer.appendChild(this.hexAddText);
    this.hexControlTeamCont.appendChild(this.hexAvatarContainer);

    this.hexDelTem = document.createElement("div");
    this.hexDelTem.setAttribute("class", "del-element");
    this.hexDelTem.innerHTML = "X";
    this.hexControlTeamCont.appendChild(this.hexDelTem);
    this.hexDelTem.addEventListener("click", () => {
      const confModal = document.getElementById("conformation-modal");
      confModal.classList.remove("hideElement");
      const confButtons = document.getElementById("confirm-buttons");
      const confYes = document.createElement("button");
      confYes.setAttribute("class", "confirm-yes");
      confYes.setAttribute("id", "confirm-yes");
      confYes.innerHTML = languages[activeLanguageIndex].text[5];
      confButtons.insertBefore(confYes, confButtons.firstChild);
      confYes.addEventListener("click", () => {
        this.remove();
        confButtons.removeChild(confButtons.firstElementChild);
        confModal.classList.add("hideElement");
      });
    });

    containerHex.appendChild(this.hexControlTeamCont);

    this.getHexBlocks();

    this.hexAvatarMovableCont = document.createElement("div");
    this.hexAvatarMovableCont.setAttribute("class", "hex-avatar-movable-cont");
    this.hexAvatarMovable = document.createElement("img");
    this.hexAvatarMovable.setAttribute("class", "hex-avatar-movable");
    const avatarCont = document.getElementById(`imgCont-${this.score}`);
    this.hexAvatarMovableCont.appendChild(this.hexAvatarMovable);
    avatarCont.appendChild(this.hexAvatarMovableCont);

    // Event listeners
    this.rightMoveButton.addEventListener("click", () => {
      this.increaseScore();
    });

    this.hexButtonLeft.addEventListener("click", () => {
      this.decreaseScore();
    });

    this.hexButtonRight.addEventListener("click", () => {
      this.increaseScore();
    });

    this.leftMoveButton.addEventListener("click", () => {
      this.decreaseScore();
    });

    this.addAvatarButton.addEventListener("click", () => {
      this.chooseAvatar();
    });

    this.hexAvatarContainer.addEventListener("click", () => {
      this.chooseAvatar();
    });

    this.hexTeamName.addEventListener("input", () => {
      this.name = this.hexTeamName.innerHTML;
    });

    this.teamName.addEventListener("input", () => {
      this.name = this.teamName.innerHTML;
    });
  }

  getHexBlocks() {
    for (let i = 0; i < this.maxSore; i++) {
      const hex = document.getElementById(`hexBlock-${i}`);
      this.hexBlocks.push(hex);
    }
  }

  addAvatar() {
    this.avatar.classList.remove("hideElement");
    this.moveButtonsContainer.classList.remove("hideElement");
    this.moveButtonsContainer.classList.add("linear-move-buttons");
    this.avatar.setAttribute("src", this.avatarUrl);
    this.hexAvatarContainer.innerHTML = "";
    this.hexAvatarContainer.appendChild(this.hexAvatar);
    this.hexAvatar.setAttribute("src", this.avatarUrl);
    this.hexAvatarMovable.setAttribute("src", this.avatarUrl);
    this.addAvatarButton.style.display = "none";
  }

  increaseScore() {
    this.score++;
    if (this.score <= 1) {
      this.score = 1;
      this.avatar.style.position = "absolute";
    } else if (this.score === this.maxSore) {
    } else if (this.score > this.maxSore) {
      this.score = this.maxSore;
      return;
    }
    this.update();
  }

  decreaseScore() {
    this.score--;
    if (this.score >= this.maxSore) {
      this.score = this.maxSore;
    } else if (this.score === 0) {
      this.avatar.style.position = "static";
    } else if (this.score < 0) {
      this.score = 0;
    }
    this.update();
  }

  update() {
    analysesScore();
    if (this.score === 0) {
      this.avatar.style.position = "static";
    }
    const position =
      this.blocksArray[
        this.score <= 0 ? 0 : this.score - 1
      ].getBoundingClientRect();

    const avatarCont = document.getElementById(
      `imgCont-${this.score >= 10 ? 10 : this.score}`
    );
    this.hexAvatarMovableCont.parentNode.removeChild(this.hexAvatarMovableCont);
    avatarCont.appendChild(this.hexAvatarMovableCont);

    for (let i = 1; i < this.maxSore; i++) {
      const newAvatarCont = document.getElementById(`imgCont-${i}`);
      const numberOfChild = newAvatarCont.childElementCount;
      if (numberOfChild === 1) {
        newAvatarCont.classList.remove("multi-2");

        newAvatarCont.classList.remove("multi");
        newAvatarCont.classList.add("single");
      } else if (numberOfChild === 2) {
        newAvatarCont.classList.remove("single");
        newAvatarCont.classList.add("multi");
        newAvatarCont.classList.add("multi-2");
      } else {
        newAvatarCont.classList.remove("multi-2");
        newAvatarCont.classList.remove("single");
        newAvatarCont.classList.add("multi");
      }
    }
    this.avatar.style.width = `${position.width * 0.9}px`;
    this.avatar.style.left = `${position.left + 10}px`;
    this.avatar.style.transform = `translateY(-20%)`;

    this.hexTeamName.innerHTML = this.name;
    this.teamName.innerHTML = this.name;

    if (this.score >= this.maxSore) {
      const textHex = document.createElement("h1");
      textHex.setAttribute("class", "won-text-h1");
      textHex.innerHTML = "";

      const textLinear = document.createElement("h1");
      textLinear.setAttribute("class", "won-text-h1");
      textLinear.innerHTML = "";

      const hexPos = this.hexAvatarMovable.getBoundingClientRect();
      const hexWon = document.createElement("div");
      hexWon.setAttribute("class", "won-text hex-won");
      hexWon.innerHTML = this.iWin[activeLanguage];
      hexWon.appendChild(textHex);
      hexWon.style.left = `${hexPos.left}px`;
      hexWon.style.top = `${hexPos.top}px`;
      this.hexControlTeamCont.appendChild(hexWon);

      const linearPos = this.avatar.getBoundingClientRect();
      const linearWon = document.createElement("div");
      linearWon.setAttribute("class", "won-text linear-won");
      linearWon.innerHTML = this.iWinLinear[activeLanguage];
      linearWon.appendChild(textLinear);
      linearWon.style.left = `${linearPos.left}px`;
      linearWon.style.top = `${linearPos.top}px`;
      this.raceTrackContainer.appendChild(linearWon);
      setTimeout(() => {
        hexWon.parentNode.removeChild(hexWon);
        linearWon.parentNode.removeChild(linearWon);
      }, 5000);
    }
  }

  chooseAvatar() {
    const container = document.getElementById("container");
    const modalBg = document.createElement("div");
    modalBg.setAttribute("class", "modal-cont");
    modalBg.setAttribute("id", "modal-cont");
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "modal");
    const title = document.createElement("h1");
    title.innerHTML = languages[activeLanguageIndex].text[6];
    modal.appendChild(title);

    const imageCont = document.createElement("div");
    imageCont.setAttribute("class", "avatar-cont");
    imageCont.setAttribute("id", "avatar-cont");

    const images = [];
    for (let i = 0; i < 15; i++) {
      const imgCont = document.createElement("div");
      imgCont.setAttribute("class", `img-cont number-${i}`);
      imgCont.setAttribute("id", `img-cont-number-${i}`);

      const img = document.createElement("img");
      img.setAttribute("class", "modal-images");
      img.setAttribute("src", `./assets/avatars/${i}.png`);
      imgCont.appendChild(img);
      const used = usedImages.indexOf(i);
      if (used >= 0) {
        const pos = imgCont.getBoundingClientRect();
        const cover = document.createElement("div");
        cover.setAttribute("class", "uActive");

        imgCont.appendChild(cover);
        imageCont.appendChild(imgCont);
      } else {
        images.push(imgCont);
        imageCont.appendChild(imgCont);
      }
    }

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        this.activeImg = parseInt(img.className.split(" ")[1].split("-")[1]);
      });
    });

    modal.append(imageCont);

    const button = document.createElement("button");
    button.innerHTML = languages[activeLanguageIndex].text[7];
    button.addEventListener("click", () => {
      this.avatarUrl = `./assets/avatars/${this.activeImg}.png`;
      usedImages.push(this.activeImg);
      this.addAvatar();
      this.removeModal();
    });
    modal.appendChild(button);
    modalBg.appendChild(modal);
    container.appendChild(modalBg);

    imageCont.addEventListener("click", () => {
      for (let i = 0; i < 15; i++) {
        const imG = document.getElementById(`img-cont-number-${i}`);
        if (i === this.activeImg) {
          imG.style.border = "2px solid var(--dark-blue)";
        } else {
          imG.style.border = "1px solid var(--white-bg)";
        }
      }
    });
  }

  removeModal() {
    const container = document.getElementById("container");
    container.removeChild(container.lastChild);
  }

  remove() {
    usedImages.splice(usedImages.indexOf(this.activeImg), 1);
    const containerHex = document.getElementById("controls");
    const containerLiner = document.getElementById("liner-page-cont");
    containerLiner.removeChild(this.teamContainer);
    containerHex.removeChild(this.hexControlTeamCont);
    this.hexAvatarMovableCont.parentNode.removeChild(this.hexAvatarMovableCont);
    let index = 0;
    teams.forEach((team, i) => {
      if ((team.id = this.id)) {
        index = i;
      }
    });
    teams.splice(index, 1);
  }
}

function analysesScore() {
  teams.forEach((team, index) => {
    scores[index] = team.score;
  });
}

function createTeam() {
  const team = new LinearTeam(
    `${languages[activeLanguageIndex].text[8]}`,
    teams.length
  );
  const cont = document.getElementById("liner-page-cont");
  const hCont = document.getElementById("controls");
  team.create(cont, hCont);
  teams.push(team);
  let scores = [];
  teams.forEach((tem) => {
    scores.push(tem.score);
  });

  teams.forEach((tem) => {
    tem.otherScores = scores;
  });
}

function goToLinear() {
  const linear = document.getElementById("linear-page");
  linear.classList.remove("hideElement");
  const hex = document.getElementById("hex-page");
  hex.classList.add("hideElement");
  updateUi();
}

function goToHex() {
  const linear = document.getElementById("linear-page");
  linear.classList.add("hideElement");
  const hex = document.getElementById("hex-page");
  hex.classList.remove("hideElement");
  updateUi();
}

function updateUi() {
  teams.forEach((team) => {
    team.update();
  });
}

function restartGame() {
  const confModal = document.getElementById("conformation-modal");
  confModal.classList.remove("hideElement");
  const confButtons = document.getElementById("confirm-buttons");
  const confYes = document.createElement("button");
  confYes.setAttribute("class", "confirm-yes");
  confYes.setAttribute("id", "confirm-yes");
  confYes.innerHTML = languages[activeLanguageIndex].text[5];
  confButtons.insertBefore(confYes, confButtons.firstChild);
  confYes.addEventListener("click", () => {
    teams.forEach((team) => {
      team.score = 0;
      team.update();
    });
    confButtons.removeChild(confButtons.firstElementChild);
    confModal.classList.add("hideElement");
  });
}

function newGame() {
  const confModal = document.getElementById("conformation-modal");
  confModal.classList.remove("hideElement");
  const confButtons = document.getElementById("confirm-buttons");
  const confYes = document.createElement("button");
  confYes.setAttribute("class", "confirm-yes");
  confYes.setAttribute("id", "confirm-yes");
  confYes.innerHTML = languages[activeLanguageIndex].text[5];
  confButtons.insertBefore(confYes, confButtons.firstChild);
  confYes.addEventListener("click", () => {
    newInit();
    confButtons.removeChild(confButtons.firstElementChild);
    confModal.classList.add("hideElement");
    createLanguageOption();
  });
}

function newInit() {
  usedImages = [];
  teams = [];
  scores = [];
  const instance = document.getElementById("container");
  instance.innerHTML = initial;

  const confirmNo = document.getElementById("confirm-no");
  confirmNo.addEventListener("click", () => {
    const confirmCont = document.getElementById("conformation-modal");
    confirmCont.classList.add("hideElement");
    const confButtons = document.getElementById("confirm-buttons");
    const confYes = document.getElementById("confirm-yes");
    if (confYes) {
      confButtons.removeChild(confYes);
    }
  });
}

function createLanguageOption() {
  const menu = document.getElementById("menu-buttons");
  languages.forEach((language) => {
    const languageIcon = document.createElement("img");
    languageIcon.setAttribute("src", `${language.flag}`);
    languageIcon.setAttribute("alt", `${language.name}`);
    languageIcon.setAttribute("class", "language-icon");
    languageIcon.setAttribute("id", `${language.name}`);
    languageIcon.addEventListener("click", (e) => {
      changeLanguage(e.target.id);
      languages.forEach((lang) => {
        const lan = document.getElementById(`${lang.name}`);
        if (lang.name === e.target.id) {
          lan.classList.add("language-icon-active");
        } else {
          lan.classList.remove("language-icon-active");
        }
      });
    });
    menu.appendChild(languageIcon);
    if (language.name === activeLanguage) {
      languageIcon.classList.add("language-icon-active");
    }
  });
}

function changeLanguage(languageName) {
  let language;
  languages.forEach((lang, index) => {
    if (lang.name === languageName) {
      language = lang;
      activeLanguage = languageName;
      activeLanguageIndex = index;
    }
  });

  language.text.forEach((line, index) => {
    const doc = document.getElementsByClassName(`text-change-${index}`);

    if (doc) {
      for (let i = 0; i <= doc.length - 1; i++) {
        if (index === 8) {
          if (activeLanguage === "english") {
            if (doc[i].innerHTML === languages[0].text[8]) {
              doc[i].innerHTML = line;
            }
          } else {
            if (doc[i].innerHTML === languages[1].text[8]) {
              doc[i].innerHTML = line;
            }
          }
          teams.forEach((team) => {
            if (activeLanguage === "english") {
              if (team.name === languages[0].text[8]) {
                team.name = line;
              }
            } else {
              if (team.name === languages[1].text[8]) {
                team.name = line;
              }
            }
          });
        } else {
          doc[i].innerHTML = line;
        }
      }
    }
  });
}

window.addEventListener("load", () => {
  const instance = document.getElementById("container");
  initial = instance.innerHTML;

  const confirmNo = document.getElementById("confirm-no");
  confirmNo.addEventListener("click", () => {
    const confirmCont = document.getElementById("conformation-modal");
    confirmCont.classList.add("hideElement");
    const confButtons = document.getElementById("confirm-buttons");
    const confYes = document.getElementById("confirm-yes");
    if (confYes) {
      confButtons.removeChild(confYes);
    }
  });
  createLanguageOption();
});
