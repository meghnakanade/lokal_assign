import React, { useRef, useState } from "react"
/* News Component*/
const News = ({ title, author, description, url }) => {

    return (
        <div>
            <h2><a href={url}>{title}</a></h2>
            <h3>{author}</h3>
            <p>{description}</p>
            <hr></hr>
            <hr></hr>
        </div>

    );
}

export default News;