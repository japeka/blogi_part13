import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const labelStyle = 'ml-4 -mt-10 text-xs text-blue-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-mt-8 peer-placeholder-shown:text-base duration-300 uppercase'
  const inputStyle = 'px-4 py-2 w-full border border-slate-600 placeholder-transparent'
  const buttonStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase w-full'

  return (
    <div className="mb-4">
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 text-center">login in to application</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start mb-9">
          <input type="text" id="username"
            onChange={handleUsernameChange}
            value={username}
            className={inputStyle}
          />
          <label htmlFor="username" className={labelStyle}>username</label>
        </div>

        <div className="flex flex-col items-start mb-9">
          <input type="password" id="password"
            value={password} onChange={handlePasswordChange}
            className={inputStyle}
          />
          <label htmlFor="password" className={labelStyle}>password</label>
        </div>
        <button className={buttonStyle} id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
