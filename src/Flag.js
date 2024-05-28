import flag from './assets/flag.png'

function Flag({ handleClick }) {

  return <button className='icons' onClick={() => handleClick()}>
    <img className='img' style={{width:"30px"}} src={flag} alt='flag' />
  </button>
}
export default Flag