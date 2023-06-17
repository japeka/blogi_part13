import React,{ useState , useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const buttonStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase w-full'
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div className="w-full" style={hideWhenVisible}>
        <button className={buttonStyle} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div className="" style={showWhenVisible}>
        {props.children}
        <button className={buttonStyle + ' mt-3'} onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  forwardRef: PropTypes.func.isRequired
}

export default Togglable
