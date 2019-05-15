// import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import './SignaturePad.css';

const Point = class {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
};

const drawLine = (context, x1, y1, x2, y2) => {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
};

const SignaturePad = () => {
  const canvasEl = useRef();
  const [signing, setSigning] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const disableDrawing = () => setIsDrawing(false);
  const [lastCoordinates, setLastCoordinates] = useState({ x: 0, y: 0 });

  const clear = () => {
    const canvas = canvasEl.current;
    const context = canvas.getContext('2d');

    setSigning(false);

    context.fillStyle = 'rgba(0,0,0,0)';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasEl.current;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    const createPoint = event => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      return new Point(x, y);
    };

    const onMousedown = event => {
      const point = createPoint(event);

      setLastCoordinates({ x: point.x, y: point.y });
      setIsDrawing(true);
      setSigning(true);
    };

    const onMousemove = event => {
      if (!isDrawing) return;

      const { x: lastX, y: lastY } = lastCoordinates;
      const point = createPoint(event);

      drawLine(context, lastX, lastY, point.x, point.y);
      setLastCoordinates({ x: point.x, y: point.y });
    };

    canvas.addEventListener('mousedown', onMousedown);
    canvas.addEventListener('mousemove', onMousemove);
    canvas.addEventListener('mouseup', disableDrawing);
    canvas.addEventListener('mouseout', disableDrawing);

    return () => {
      canvas.removeEventListener('mousemove', onMousemove);
      canvas.removeEventListener('mousedown', onMousedown);
      canvas.removeEventListener('mouseup', disableDrawing);
      canvas.removeEventListener('mouseout', disableDrawing);
    };
  });

  return (
    <div className="SignaturePad">
      <button onClick={clear}>Clear signature</button>
      {!signing && (
        <h1>
          Click & draw your signature
          <span>Write your name as it appears on your ID</span>
        </h1>
      )}
      <canvas ref={canvasEl} width={500} height={300} />
    </div>
  );
};

export default SignaturePad;
