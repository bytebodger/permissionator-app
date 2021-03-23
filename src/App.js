import React, { useEffect, useState } from 'react';
import face from './face.svg';
import { color } from '@toolz/color';

export const App = () => {
   const [colorMap, setColorMap] = useState(<></>);
   const [colorList, setColorList] = useState(<></>);
   
   useEffect(() => {
      const createColorList = (colors = {}) => {
         setColorList(<>
            <table style={{borderCollapse: 'collapse'}}>
               <thead>
                  <tr>
                     <th>Index</th>
                     <th style={{textAlign: 'left'}}>Name</th>
                     <th>Amount</th>
                  </tr>
               </thead>
               <tbody>
                  {getColorListRows(colors)}
               </tbody>
            </table>
         </>);
      };
      
      const createColorMap = (rows = [], showIndexes = true) => {
         setColorMap(<>
            <table style={{borderCollapse: 'collapse'}}>
               <tbody>
                  {getColorMapRows(rows, showIndexes)}
               </tbody>
            </table>
         </>);
      };
      
      const getColorListRows = (colors = {}) => {
         return Object.keys(colors).map(usedColor => {
            return <tr key={usedColor}>
               <td style={{textAlign: 'right'}}>{colorIndex[usedColor]}.</td>
               <td>{usedColor}</td>
               <td style={{textAlign: 'right'}}>{colors[usedColor]}</td>
            </tr>;
         });
      };
      
      const getColorMapCells = (paints = [], rowIndex = -1, showIndexes = true) => {
         return paints.map((paint, index) => {
            const brightness = paint.red + paint.green + paint.blue;
            return <td
               key={`cell-${rowIndex}-${index}`}
               style={{
                  backgroundColor: `rgb(${paint.red}, ${paint.green}, ${paint.blue})`,
                  color: brightness > 382 ? 'black' : 'white',
                  fontSize: '0.4em',
                  height: 12,
                  minWidth: 12,
                  padding: 0,
                  textAlign: 'center',
                  width: 12,
               }}
            >{showIndexes && colorIndex[paint.name]}</td>;
         });
      };
      
      const getColorMapRows = (rows = [], showIndexes = true) => {
         return rows.map((row, index) => {
            return <tr key={`row-${index}`}>
               {getColorMapCells(row, index, showIndexes)}
            </tr>;
         });
      };
      
      color.addColorsToPalette(color.heavyBodyAcrylicPaints);
      color.setLightInsensitivity(100);
      color.setAlgorithm(color.algorithm.RGB_SQUARED);
      let colorIndex = {};
      color.heavyBodyAcrylicPaints.forEach((paint, index) => colorIndex[paint.name] = index);
      const canvas = document.getElementById('canvas1');
      const context = canvas.getContext('2d');
      const image = new Image();
      image.src = face;
      image.onload = () => {
         context.drawImage(image, 0, 0);
         const stats = color.pixelate(canvas, 10, true);
         console.log(stats.colors);
         canvas.style.display = 'none';
         createColorMap(stats.map, true);
         createColorList(stats.colors);
      };
   }, []);
   
   return <>
      <canvas
         height={1440}
         id={'canvas1'}
         width={1440}
      ></canvas>
      {colorMap}
      {colorList}
   </>;
};
