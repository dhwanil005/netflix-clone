import React from 'react'
import Nav from "../Nav"
import Banner from "../Banner"
import "./HomeScreen.css"
import Row from "../Row"
import requests from "../Requests"

function HomeScreen() {
  return (
    <div>
        <Nav />
        <Banner />
        <Row 
        title ="Netflix Originals"
        fetchUrl = {requests.fetchNetflixOriginals} 
        isLargeRow />
        <Row 
        title ="Trending Now"
        fetchUrl = {requests.fetchTrending} 
        />
        <Row 
        title ="Action Movies"
        fetchUrl = {requests.fetchActionMovies} 
        />
        <Row 
        title ="Comedy Movies"
        fetchUrl = {requests.fetchComedyMovies} 
        />
        <Row 
        title ="Documentaries"
        fetchUrl = {requests.fetchDocumentaries} 
        />
        <Row 
        title ="Horror Movies"
        fetchUrl = {requests.fetchHorrorMovies} 
        />
        <Row 
        title ="Romance Movies"
        fetchUrl = {requests.fetchRomanceMovies} 
        />

    </div>
  )
}

export default HomeScreen