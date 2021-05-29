import {ResizableBox, ResizableBoxProps} from 'react-resizable';
import './ResizableCustom.css';
import {useEffect, useState} from "react";

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const ResizableCustom: React.FC<ResizableProps> = props => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);
    useEffect(() => {
        let timer: any; //debouncing
        const listener = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }
            }, 100);
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [width])

    let resizableConfig: ResizableBoxProps;
    if (props.direction === 'horizontal') {
        resizableConfig = {
            className: 'resize-horizontal',
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width,
            resizeHandles: ['e'],
            onResizeStop: (e, data) => {
                setWidth(data.size.width)
            }
        }
    } else {
        resizableConfig = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 36],
            height: 300,
            width: Infinity,
            resizeHandles: ['s']
        }
    }

    return <ResizableBox {...resizableConfig}>{props.children}</ResizableBox>
}

export default ResizableCustom;