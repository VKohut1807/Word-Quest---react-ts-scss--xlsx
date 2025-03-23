import React from "react";

import "@/assets/scss/pages/home.scss";

const Home: React.FC = () => {
  return (
    <section className="home">
      <header>
        <h1>Home Page</h1>
      </header>
      <main>
        <p>Welcome to the Dictionary Home Page!</p>
      </main>
    </section>
  );
};

export default Home;
