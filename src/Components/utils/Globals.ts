class Globals{}

class DevelopmentGlobals extends Globals{
    public urls = {
        admin : "http://localhost:8080/admin/",
        company : "http://localhost:8080/company/",
        customer : "http://localhost:8080/customer/",
        guest : "http://localhost:8080/guest/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        admin : "/admin/",
        company : "/company/",
        customer : "/customer/",
        guest : "/guest/",
        general : "/"
    }
}

class TestingGlobals extends Globals{}


const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;