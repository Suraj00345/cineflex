import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieContent from "./components/MovieContent";
import Footer from "./components/Footer";
import ScrollOnTop from "./components/ScrollOnTop";
import { MoviesProvider } from "./context/MovieContext";

function App() {
  return (
    <MoviesProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <MovieContent />
        </main>
        <Footer />
        <ScrollOnTop />
      </div>
    </MoviesProvider>
  );
}

export default App;
