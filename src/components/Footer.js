import '../styles/Homepage/footer.css';

export default function Footer() {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="footer-section text-center">
                            <img src={require('../styles/Homepage/images/codehealth-logo.png')} alt="Logo" className="footer-logo" />
                            <p className="footer-about pt-3">
                                Empowering wellness seekers through innovative technology. Bridging the gap between code crafters and health enthusiasts.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="footer-section text-center">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/services">Services</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="footer-section text-center">
                            <h3>Contact Us</h3>
                            <p>123 Street, Taguig, PH</p>
                            <p>Email: testemail@codehealth.com</p>
                            <p>Phone: +639 123 123 123</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center text-white">
                            <p className='m-0 pt-3'>&copy; 2024 CodeHealth Pharmacy | All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}