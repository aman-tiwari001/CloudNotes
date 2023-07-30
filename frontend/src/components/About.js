import React, {useEffect} from 'react';

const About = (props) => {

    useEffect(() => {
      props.setProgress(20);
      setTimeout(() => {
        props.setProgress(100);
      }, 200);
      props.setProgress(60);
      // eslint-disable-next-line
    }, [])
 
  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>About</h2>
      <p style={{"fontSize":"1.1rem"}}>
        CloudNotes is cloud based note utility which allows you to upload your notes on cloud and later you can access it from anywhere and anytime.
        You can create, edit, view and delete your notes. Your notes are very much secure on our plattform and we repect your privacy.
        <br /> <br />
        At CloudNotes, our mission is to provide a seamless and reliable cloud-based note utility that empowers you to stay organized and productive effortlessly. With the freedom to upload, access, and manage your notes from any device, you can truly stay connected to your ideas and thoughts wherever you go.
        <br /><br />
        Edit and modify your notes with ease. We understand that thoughts are ever-evolving, and your notes should reflect that. Our intuitive editing tools enable you to make changes, add images or links, and fine-tune your notes to perfection.
        <br /><br />
        Join us on this exciting journey of productivity and creativity. Start using CloudNotes today and unleash the power of cloud-based note-taking. Let us help you transform the way you capture, organize, and access your ideas – anytime, anywhere. Your notes, your life, simplified with CloudNotes.
      </p>
    </div> 
  )
}

export default About;
