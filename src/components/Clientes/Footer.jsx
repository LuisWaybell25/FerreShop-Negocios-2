const Footer = () => {
    return (
        // Footer
        <footer className="mt-auto text-center text-lg-start bg-light text-muted">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4">
            {/* Left */}
            <div className="me-5 d-none d-lg-block">
            {/* <span>Get connected with us on social networks:</span> */}
            </div>
            {/* Left */}

            {/* Right */}
            <div>
            
            </div>
            {/* Right */}
        </section>
        {/* Section: Social media */}

        {/* Section: Links  */}
        <section className="">
            <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                    <h6 className="text-uppercase fw-bold mb-4">
                        <i className="fas fa-gem me-3"></i>FerreShop
                    </h6>
                    <p>
                        En FerreShop encuentra todo en herramientas manuales, de medición y eléctricas. Además de materiales y consumibles para todo tipo de trabajo.
                    </p>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                    <p><i className="fas fa-home me-3"></i> Aguascalientes, Ags, México</p>
                    <p>
                        <i className="fas fa-envelope me-3"></i>
                        atencion@ferreshop.com
                    </p>
                    <p><i className="fas fa-phone me-3"></i> + 52 449 567 88</p>
                    <p><i className="fas fa-facebook me-3"></i><a target="_blank" href="https://www.facebook.com/profile.php?id=100087487063872&mibextid=ZbWKwL">Ferreshop en Facebook</a></p>
                </div>
                {/* Grid column */}
            </div>
            {/* Grid row */}
            </div>
        </section>
        {/* Section: Links  */}

        {/* Copyright */}
        <div className="text-center p-4" >
            © 2022 Copyright:
            <span className="text-reset fw-bold"> FerreShop</span>
        </div>
        {/* Copyright */}
        </footer>
        // Footer
    );
}
 
export default Footer;