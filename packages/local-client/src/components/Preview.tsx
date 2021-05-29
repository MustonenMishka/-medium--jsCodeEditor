import {useEffect, useRef} from "react";
import './Preview.css';

interface PreviewProps {
    code: string;
    bundleError: string;
}

const frameHtml = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
        </body>
        <script >
            const handleError = (err) => {
                const root = document.getElementById('root');
                root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>'+err+'</div>';
                console.log(err)
            };
            window.addEventListener('error', e => {
                e.preventDefault();
                handleError(e.error)
            })
            window.addEventListener('message', e => {
                try {
                    eval(e.data)
                } catch (err) {
                    handleError(err)     
                }
            }, false)
        </script>
    </html>
    `;

const Preview: React.FC<PreviewProps> = props => {
    useEffect(() => {
        frameRef.current.srcdoc = frameHtml;
        setTimeout(() => {
            frameRef.current.contentWindow.postMessage(props.code, '*');
        }, 50);
    }, [props.code]);

    const frameRef = useRef<any>();

    return <div className='preview-wrapper'>
        <iframe
            ref={frameRef}
            title='codeExec'
            sandbox='allow-scripts'
            srcDoc={frameHtml}
        />
        {props.bundleError && <div className="preview-error">{props.bundleError}</div>}
    </div>
};

export default Preview;