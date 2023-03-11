import backgroundlogin from '../../images/logincover.png'
import '../Auth/auth.css';
function Login(){
    return (
        <>
        <section className=''>
            <div className='container-fluid'>
                <div className='login-background-wrapper'>
                        <img src={backgroundlogin}/>
                </div>
            </div>
        </section>
        </>
    )
}
export default Login