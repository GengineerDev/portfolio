import MainButton from './MainButton'
function Greeting() {
    return (
    <div class='container'>
        <div class="column">
          <div class="circle">
            <div class="circle-image"></div>
        </div>

        </div>
        <div class="column">
          <h1 id="greeting-header">Hi,</h1>
          <p className='greeting-text'>Welcome to Gen's online portfolio. My hobbies range from technology to youth engagements, but I'm most excited about doing web development. View some of my work below in pictures!</p>
        </div>
        <div class="column space-above">
          <p className='greeting-text'>If you want to read my whole experience in organizations, competitions, and whatnot, download my CV!</p>
          <MainButton link="https://docs.google.com/document/d/1w-9hkObP0lye9YG0UmeS7klA-HoFkE9I/edit?usp=share_link&ouid=114555168601342208112&rtpof=true&sd=true">See my CV!</MainButton>
        </div>
    </div>
    )
}

export default Greeting