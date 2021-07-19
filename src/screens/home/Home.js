import React, { useState, useEffect } from "react";
import { ImageListItem, ImageList } from '@material-ui/core';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    Link
} from 'react-router-dom';


import './Home.css';
import Header from './../common/header/Header';


const Home = (props) => {


    const [imageLoaded, setimageLoaded] = useState(false);
    const [movieName, setMovieName] = useState('');
    const [genreName, setGenreName] = useState([]);
    const [artistName, setArtistName] = useState([]);
    const [releaseDateStart, seteReleaseDateStart] = useState(new Date('2021-08-18T21:11:54'));
    const [releaseDateEnd, seteReleaseDateEnd] = useState(new Date('2021-08-18T21:11:54'));

    const myMoviesData = props.moviesData;
    let publishedMovies = myMoviesData.filter(res => res.status ==='PUBLISHED');
    let releasedMoviesIntial = myMoviesData.filter(res => res.status === 'RELEASED');


    const [releasedMovies, setReleasedMovies] = useState([{ id: '', title: '', storyline: '', genres: [], duration: '', poster_url: '', trailer_url: '', wiki_url: '', release_date: '', censor_board_rating: '', rating: '', status: '', artists: [] }]);

    useEffect(() => {
        setReleasedMovies(releasedMoviesIntial);
    }, [props.moviesData]);


    const handleMovieChange = (e) => {
        setMovieName(e.target.value);

    }

    let combinedFilterData = [];


    const onclickApply = (e) => {
        e.preventDefault();

        let releasedMoviesWithSelectedName = [];
        let releasedMoviesWithSelectedGenre = [];
        let releasedMoviesWithSelectedArtists = [];
        let releasedMoviesWithSelectedStartDate = [];
        let releasedMoviesWithSelectedEndDate = [];

        releasedMoviesIntial.filter(releasedMovies => {

            if (movieName!=='') {
                if (releasedMovies.title.toLowerCase().includes(movieName)) {
                    releasedMoviesWithSelectedName.push(releasedMovies);
                }
            }
            if (genreName.length > 0 && releasedMovies.genres.length > 0) {
                genreName.forEach(genreItem => {
                    if (releasedMovies.genres.includes(genreItem) && !releasedMoviesWithSelectedGenre.includes(releasedMovies)) {
                        releasedMoviesWithSelectedGenre.push(releasedMovies);
                    }

                })

            }
            if (artistName.length > 0 && releasedMovies.artists.length > 0) {
                artistName.forEach(artistSelected => {
                    releasedMovies.artists.forEach(artistItem => {

                        if ((artistItem.first_name + " " + artistItem.last_name === artistSelected) && !releasedMoviesWithSelectedArtists.includes(releasedMovies)) {
                            releasedMoviesWithSelectedArtists.push(releasedMovies);
                        }

                    })

                })

            }

            if (releaseDateStart!=='') {
                if (releaseDateStart.getTime() < new Date(releasedMovies.release_date).getTime()) {
                    releasedMoviesWithSelectedStartDate.push(releasedMovies)
                }

            }

            if (releaseDateEnd!=='') {
                if (releaseDateEnd.getTime() > new Date(releasedMovies.release_date).getTime()) {
                    releasedMoviesWithSelectedEndDate.push(releasedMovies)
                }
            }
        });

        releasedMoviesIntial.forEach(eachMovie => {
            if (((movieName!=='' && releasedMoviesWithSelectedName.includes(eachMovie)) || movieName === '')
                && ((genreName.length > 0 && releasedMoviesWithSelectedGenre.includes(eachMovie)) || genreName.length === 0)
                && ((artistName.length > 0 && releasedMoviesWithSelectedArtists.includes(eachMovie)) || artistName.length === 0)
                && (releasedMoviesWithSelectedStartDate.includes(eachMovie))
                && (releasedMoviesWithSelectedEndDate.includes(eachMovie))) {
                combinedFilterData.push(eachMovie)
            }
        })

        setReleasedMovies(combinedFilterData);
    }

    const handleGenreChange = (e) => {
        setGenreName(e.target.value);
    }

    const handleArtistChange = (e) => {
        setArtistName(e.target.value)
    }
    const handleReleaseDateChange = (releaseDateStart) => {
        seteReleaseDateStart(releaseDateStart);
    };

    const handleReleaseEndDateChange = (releaseDateEnd) => {
        seteReleaseDateEnd(releaseDateEnd);
    };

    let genres = [];
    props.genresData.forEach(genre => {
        genres.push(genre.genre);

    })

    let artists = [];
    props.artistsData.forEach(artist => {
        artists.push(artist.first_name + " " + artist.last_name);

    })

    return (


        <React.Fragment>
            <Header isBookShowAvailable={false}></Header>
            <div className='home-header'>Upcoming Movies</div>

            <ImageList rowHeight={250} className='home-imageList' cols={publishedMovies.length}>
                {
                    myMoviesData.map(item => (
                        item.status === 'PUBLISHED' &&

                        <ImageListItem key={item.id} cols={1} className='home-ImageListItem'>
                            <img src={item.poster_url} style={imageLoaded ? {} : { display: 'none' }} onLoad={() => setimageLoaded(true)} alt=""/>
                            <ImageListItemBar title={item.title} />

                        </ImageListItem>
                    ))
                }
            </ImageList>

            <div className='releasedmovies-filter flex-container'>
                <div className='releasedMoviesRight'>

                    <ImageList rowHeight={250} className='home-imageList-released' cols={4}>
                        {
                            releasedMovies.map(item => (
                                <ImageListItem key={item.id} cols={1} className='home-ImageListItem-released'>
                                    <Link
                                        to={{
                                            pathname: `/details/${item.id}`,
                                            state: {
                                                selectedMovieDetails: item,
                                            },
                                        }}
                                    >


                                        <img src={item.poster_url} style={imageLoaded ? {} : { display: 'none' }} onLoad={() => setimageLoaded(true)} alt=""/>
                                        <ImageListItemBar title={item.title} />
                                    </Link>
                                </ImageListItem>
                            ))
                        }
                    </ImageList>

                </div>

                <div>
                    <Card className='filter-card'>
                        <CardContent>
                            <span className='filter-heading'>FIND MOVIES BY:</span>
                            <CardActions>
                                <form className="filter-form" autoComplete="off" onSubmit={onclickApply}>
                                    < TextField value={movieName} name="movieName" id="movie-name" label="Movie Name" onChange={handleMovieChange} />

                                    <FormControl className='genre'>
                                        <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-checkbox-label"
                                            id="demo-mutiple-checkbox"
                                            multiple
                                            value={genreName}
                                            onChange={handleGenreChange}
                                            input={<Input />}
                                            renderValue={(selected) => selected.join(', ')}
                                        >
                                            {genres.map((genre) => (
                                                <MenuItem key={genre} value={genre}>
                                                    <Checkbox />
                                                    <ListItemText primary={genre} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className='artists'>
                                        <InputLabel id="demo-mutiple-checkbox-label">Artists</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-checkbox-label"
                                            id="demo-mutiple-checkbox"
                                            multiple
                                            value={artistName}
                                            onChange={handleArtistChange}
                                            input={<Input />}
                                            renderValue={(selected) => selected.join(', ')}

                                        >
                                            {artists.map((artist) => (
                                                <MenuItem key={artist} value={artist}>
                                                    <Checkbox />
                                                    <ListItemText primary={artist} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>


                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justifyContent="space-around">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Release Date Start"
                                                value={releaseDateStart}
                                                onChange={handleReleaseDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />

                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Release Date End"
                                                value={releaseDateEnd}
                                                onChange={handleReleaseEndDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>


                                    <div><Button type="submit" className='apply-button' variant="contained" color='primary'>Apply</Button></div>
                                </form>
                            </CardActions>
                        </CardContent>
                    </Card>

                </div>
            </div>

        </React.Fragment>

    );

};


export default Home;
