import { useState } from "react";

// Import statement to indicate that yo need to bundle `../movie-card/movie-card.jsx`
import { MovieCard } from "../movie-card/movie-card";

// Import statement to indicate that yo need to bundle `../movie-view/movie-view.jsx`
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Gladiator",
      description: "Commodus takes over power and demotes Maximus, one of the preferred generals of his father, Emperor Marcus Aurelius. As a result, Maximus is relegated to fighting till death as a gladiator.",
      director: {
        name: "Ridley Scott",
        bio: "Ridley Scott is a British film director and producer whose movies are acclaimed for their visual style and rich details. His best-known films include The Duellists (1977), Alien (1979), Blade Runner (1982), Legend(1985), Thelma & Louise (1991), Gladiator (2000), Black Hawk Down (2001), and The Martian (2015).",
        birth: "1937"
      },
      genre: {
        name: "Drama",
        description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward."
      },
      imageURL: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51XQKPC010L.__AC_SX300_SY300_QL70_ML2_.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Joker",
      description: "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him.",
      director: {
        name: "Todd Phillips",
        bio: "Todd Phillips is an American film director, producer, and screenwriter. He began his career in 1993 and directed films in the 2000s such as Road Trip, Old School, Starsky & Hutch, and School for Scoundrels. He came to wider prominence in the early 2010s for directing The Hangover film series.",
        birth: "1970"
      },
      genre: {
        name: "Thriller",
        description: "A thriller is a type of mystery with a few key differences. As its name suggests, thrillers tend to be action-packed and fast-paced with moments full of tension, anxiety, and fear."
      },
      imageURL: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Wall-E",
      description: "A machine responsible for cleaning a waste-covered Earth meets another robot and falls in love with her. Together, they set out on a journey that will alter the fate of mankind.",
      director: {
        name: "Andrew Stanton",
        bio: "Andrew Ayers Stanton is an American filmmaker and voice actor based at Pixar, which he joined in 1990.",
        birth: "1965"
      },
      genre: {
        name: "Adventure",
        description: "The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically. Often the protagonist has a mission and faces many obstacles in his way."
      },
      imageURL: "https://i.ebayimg.com/images/g/W3EAAOSwi2ZZ3n4w/s-l1600.jpg",
      featured: true
    },
    {
      id: 4,
      title: "Alien: Covenant",
      description: "The crew of a colony ship, Covenant, receive a radio transmission from a habitable planet. However, they encounter deadly aliens while investigating the planet and try to escape.",
      director: {
        name: "Ridley Scott",
        bio: "Ridley Scott is a British film director and producer whose movies are acclaimed for their visual style and rich details. His best-known films include The Duellists (1977), Alien (1979), Blade Runner (1982), Legend(1985), Thelma & Louise (1991), Gladiator (2000), Black Hawk Down (2001), and The Martian (2015).",
        birth: "1937"
      },
      genre: {
        name: "Sci-fi",
        description: "Science fiction, also often known as 'sci-fi', is a genre of literature that is imaginative and based around science. It relies heavily on scientific facts, theories, and principles as support for its settings, characters, themes, and plot."
      },
      imageURL: "https://m.media-amazon.com/images/M/MV5BYzVkMjRhNzctOGQxMC00OGE2LWJhN2EtNmYyODRiMDNlM2ZmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      featured: true
    },
    {
      id: 5,
      title: "Up",
      description: "Carl, an old widower, goes off on an adventure in his flying house in search of Paradise Falls, his wife's dream destination.",
      director: {
        name: "Pete Docter",
        bio: "Peter Hans Docter is an American animator, film director, screenwriter, producer, voice actor, and chief creative officer of Pixar. He is best known for directing the Pixar animated feature films Monsters, Inc., Up, Inside Out, and Soul, and as a key figure and collaborator at Pixar.",
        birth: "1968"
      },
      genre: {
        name: "Animation",
        description: "Animation is a method by which still figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, many animations are made with computer-generated imagery (CGI)."
      },
      imageURL: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg",
      featured: true
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};