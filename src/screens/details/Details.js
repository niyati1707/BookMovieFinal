import React, { useState } from "react";
import Typography from '@material-ui/core/Typography'

import './Details.css';
import {
    Link
} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ImageListItem, ImageList } from '@material-ui/core';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Header from './../common/header/Header';


function Details(props) {

    const [selectedColor1, setSelectedColor1] = useState('black');
    const [selectedColor2, setSelectedColor2] = useState('black');
    const [selectedColor3, setSelectedColor3] = useState('black');
    const [selectedColor4, setSelectedColor4] = useState('black');
    const [selectedColor5, setSelectedColor5] = useState('black');




    let embed_url;

    let currentMovieDetails = props.location.state.selectedMovieDetails;
    if (currentMovieDetails.trailer_url.includes("www.youtube.com/watch/?v=")) {
        embed_url = currentMovieDetails.trailer_url.replace("www.youtube.com/watch/?v=", "www.youtube.com/embed/")
    }
    if (currentMovieDetails.trailer_url.includes("www.youtube.com/watch?v=")) {
        embed_url = currentMovieDetails.trailer_url.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/")
    }


    return (
        <React.Fragment>
            <Header isBookShowAvailable={true} id={currentMovieDetails.id} item ={currentMovieDetails}></Header>
            <div className='details'>
                <div className='left-pannel'>
                    <Link
                        to={{
                            pathname: "/",
                        }}
                    >
                        <Typography className='left-pannel-back'> &lt; Back to Home </Typography>
                    </Link>
                    <img src={currentMovieDetails.poster_url} alt="Logo" />
                </div>

                <div>
                    <Typography variant="h2"> {currentMovieDetails.title} </Typography>
                    <Typography><span><b>Genre:</b></span>{currentMovieDetails.genres.join(",")} </Typography>
                    <Typography><span><b>Duration:</b></span>{currentMovieDetails.duration} </Typography>
                    <Typography><span><b>Release Date:</b></span>{(currentMovieDetails.release_date)} </Typography>
                    <Typography><span><b>Rating:</b></span>{currentMovieDetails.rating} </Typography>
                    <Typography><span><b>Plot:</b></span><a href={currentMovieDetails.wiki_url}>(Wiki Link)</a>{currentMovieDetails.story_line} </Typography>
                    <Typography><span><b>Trailer:</b></span>
                        <span><iframe width="800" height="345" src={embed_url}></iframe></span>
                    </Typography>
                </div>
                <div>
                <Typography> Rate this Movie: </Typography>
                <div>
                <span onClick={()=>{setSelectedColor1('yellow')}}> 
                <StarBorderIcon className={selectedColor1 === 'black' ? 'rating-black': 'rating-yellow'}/>
                </span>
                <span onClick={()=>{setSelectedColor2('yellow')}}> 
                <StarBorderIcon className={selectedColor2 === 'black' ? 'rating-black': 'rating-yellow'}/>
                </span>
                <span onClick={()=>{setSelectedColor3('yellow')}}> 
                <StarBorderIcon className={selectedColor3 === 'black' ? 'rating-black': 'rating-yellow'}/>
                </span>
                <span onClick={()=>{setSelectedColor4('yellow')}}> 
                <StarBorderIcon className={selectedColor4 === 'black' ? 'rating-black': 'rating-yellow'}/>
                </span>
                <span onClick={()=>{setSelectedColor5('yellow')}}> 
                <StarBorderIcon className={selectedColor5 === 'black' ? 'rating-black': 'rating-yellow'}/>
                </span>
                                </div>
                <div>Artists</div>

                    <ImageList rowHeight={250} className='artist-imageList' cols={4}>
                        {
                            currentMovieDetails.artists.map(artist => (
                                <ImageListItem key={artist.id} cols={1} className='artist-ImageListItem'>
                                        <img src={artist.profile_url} alt=""/>
                                        <ImageListItemBar title={artist.first_name + " " + artist.last_name} />
                                </ImageListItem>
                            ))
                        }
                    </ImageList>
                </div>


            </div>

        </React.Fragment>
    );

};


export default Details;
