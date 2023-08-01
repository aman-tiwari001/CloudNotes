import React, {useEffect} from 'react';
import Notes from './Notes';

const Home = (props) => {
  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 200);
    props.setProgress(60);
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Notes setProgress={props.setProgress} showAlert={props.showAlert}/>
    </>
  )
}

export default Home;
