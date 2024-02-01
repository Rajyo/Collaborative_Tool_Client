import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faCircle } from '@fortawesome/free-solid-svg-icons'
import { ChromePicker } from 'react-color'
import { SetStateAction, useState } from 'react';
import { useEffect, useLayoutEffect, useRef } from "react";


const Canvas = ({ socket }: SocketType) => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    const shouldDraw = useRef<boolean>(false)
    var [arr, setArr] = useState<[] | SetStateAction<string>[]>([])

    const usePrevious = (value: string) => {
        const ref = useRef<string>();
        useEffect(() => {
            ref.current = value;
            value !== '#fff' && setArr([...arr, value])
        }, [value]);
        return ref.current;
    }

    var [color, setColor] = useState<string>('#000')
    usePrevious(color)
    var [size, setSize] = useState<number>(3)
    var [palatte, setPalette] = useState<boolean>(false)
    var [showStrokeToolOption, setShowStrokeToolOption] = useState<boolean>(true)
    const [clicked, setClicked] = useState<boolean>(true)
    // console.log(prevColor)


    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        if (context == null) throw new Error('Could not get context');

        const changeConfig = (color: string, size: number) => {
            context.strokeStyle = color
            context.lineWidth = size
        }

        const handleChangeConfig = (config: Config) => {
            console.log("config", config)
            changeConfig(config.color, config.size)
        }
        changeConfig(color, size)
        socket.on('changeConfig', handleChangeConfig)

        return () => {
            socket.off('changeConfig', handleChangeConfig)
        }
    }, [color, size])

    // before browser paint
    useLayoutEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        if (context == null) throw new Error('Could not get context');

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const beginPath = (x: number, y: number) => {
            context.beginPath()
            context.moveTo(x, y)
        }

        const drawLine = (x: number, y: number) => {
            context.lineTo(x, y)
            context.stroke()
        }
        const handleMouseDown = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            shouldDraw.current = true
            beginPath(x, y)
            socket.emit('beginPath', { x: x, y: y })
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!shouldDraw.current) return
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            drawLine(x, y)
            socket.emit('drawLine', { x: x, y: y })
        }

        const handleMouseUp = () => {
            shouldDraw.current = false
        }

        const handleBeginPath = (path: BeginDraw) => {
            beginPath(path.x, path.y)
        }

        const handleDrawLine = (path: BeginDraw) => {
            drawLine(path.x, path.y)
        }

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseup', handleMouseUp)

        socket.on('beginPath', handleBeginPath)
        socket.on('drawLine', handleDrawLine)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)

            socket.off('beginPath', handleBeginPath)
            socket.off('drawLine', handleDrawLine)
        }
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='h-20 flex justify-around items-center text-2xl p-3 relative bg-gray-50'>
                <div className='cursor-pointer p-1' onClick={() => { setPalette(!palatte) }}>
                    <FontAwesomeIcon icon={faCircle} color={color} className={`${!clicked ? 'bg-gray-800 rounded-md' : 'bg-white'}`} />
                </div>
                {(showStrokeToolOption && palatte) && <div className='z-10 absolute left-2 top-20' onClick={() => setPalette(!palatte)}>
                    <ChromePicker color={color} onChange={(e) => { setColor(e.hex); setColor(e.hex); socket.emit('changeConfig', { color: e.hex, size: size }) }} />
                </div>}

                <div className={`cursor-pointer p-2 ${clicked ? 'bg-gray-300 rounded-md' : 'bg-white'}`} onClick={() => { setColor(arr[arr.length - 1]); setShowStrokeToolOption(true); setClicked(true); socket.emit('changeConfig', { color: arr[arr.length - 1], size: size }) }}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className={`cursor-pointer p-2 ${!clicked ? 'bg-gray-300 rounded-md' : 'bg-white'}`} onClick={() => { setColor('#fff'); setShowStrokeToolOption(false); setClicked(false); socket.emit('changeConfig', { color: '#fff', size: size }) }}>
                    <FontAwesomeIcon icon={faEraser} />
                </div>
                {<>
                    <input type="range" min={1} max={20} step={1} onChange={(e) => { setSize(parseInt(e.target.value)); socket.emit('changeConfig', { color: color, size: e.target.value }) }} value={size} />
                </>}
            </div>
            <div className='border'>
                <canvas ref={canvasRef} className='' />
            </div>
        </div>
    )
}

export default Canvas

