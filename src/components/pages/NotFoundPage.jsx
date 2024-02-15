import React, { Fragment } from "react";

function NotFoundPage() {
    return (
        
            <div className="grid text-center my-5" >
                <h1>⚠ Error 404 ⚠</h1>
                <h2>Opps! Looks like the page you are looking for does not exist.</h2>
                <br />
                <br />
                <a href="/"><p className="btn btn-lg btn-warning">Return to HomePage</p></a>
            </div>
        
    )
}

export default NotFoundPage;