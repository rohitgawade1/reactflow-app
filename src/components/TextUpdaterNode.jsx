// import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export function TextUpdaterNode({ data }) {
    console.log(data)
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  const handleClick = (e) => {
    console.log(e.target.parentNode.remove())
  }

  return (
    <div className='node-box'>
      <Handle type="target" position={Position.Top} />
      <div>
        <div className='box-container'>
          <label htmlFor="text">{data.label}</label>
          <button onClick={handleClick} className='close'>X</button>
        </div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
}