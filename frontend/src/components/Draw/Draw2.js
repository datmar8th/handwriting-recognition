import { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Line, Rect } from 'react-konva'
import html2canvas from 'html2canvas'
import trimCanvas from 'trim-canvas'
import axios from "axios";
import { exportComponentAsJPEG } from "react-component-export-image";

const Draw2 = () => {

  const [lines, setLines] = useState([])
  const isDrawing = useRef(false)
  const [res, setRes] = useState([])
  const refCanvas = useRef();

  const handleMouseDown = (event) => {
    isDrawing.current = true
    const { offsetX, offsetY } = event.evt
    setLines([...lines, { points: [{ x: offsetX, y: offsetY }] }])
  }

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return
    const { offsetX, offsetY } = event.evt
    const updatedLines = [...lines]
    const lastLine = updatedLines[updatedLines.length - 1]
    lastLine.points = [...lastLine.points, { x: offsetX, y: offsetY }]
    setLines(updatedLines)
  }

  const handleMouseUp = () => {
    isDrawing.current = false
    // handleExportImage()
  }

  const handleTouchStart = (event) => {
    const stage = event.target.getStage()
    const position = stage.getPointerPosition()
    setLines([...lines, { points: [position] }])
  }

  const handleTouchMove = (event) => {
    const stage = event.target.getStage()
    const position = stage.getPointerPosition()
    const updatedLines = [...lines]
    const lastLine = updatedLines[updatedLines.length - 1]
    lastLine.points = [...lastLine.points, position]
    setLines(updatedLines)
  }

  const handleUndo = async () => {
    setLines(lines.slice(0, -1))
  }

  const handleClear = () => {
    setLines([])
    setRes([])
  }

  const handleExportImage = async () => {
    const dataURL = await html2canvas(document.getElementById('drawing-board'))

    setTimeout(async () => {
      const trimmedCanvas = (trimCanvas)(dataURL)
      const blob = await new Promise((resolve) => {
        trimmedCanvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      })

      const formData = new FormData()
      formData.append('file', blob, 'img_transformer.png')
      axios.post("http://127.0.0.1:5000/upload", formData).then((res, data) => {
      data = res.data;
      console.log(data);
    })}, 100);
  }

  return (
    <div className='container mt-10 flex columns-2 gap-2'>
      <div className=' ml-20 '>
        <Stage
          ref={refCanvas}
          id='drawing-board'
          width={700}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleExportImage}
        >
          <Layer>
            <Rect height={500} width={700} fill={'white'} />
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points.flatMap((point) => [point.x, point.y])}
                stroke='black'
                strokeWidth={10}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
              />
            ))}
          </Layer>
        </Stage>
        <div className='mt-4'>
          <button onClick={handleUndo} className='ml-5'>
            Quay lại
          </button>
          <button onClick={handleClear} className='ml-20'>
            Xóa hết
          </button>
          <button
            onClick={() => exportComponentAsJPEG(refCanvas, { fileName: "result" })}
            className="btn"
            style={{
              marginRight: "2rem",
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}


export default Draw2;