import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from './App.module.scss';
import { GameType } from './GameType';
import GameComponent from './GameComponent';
import { createBrowserHistory } from "history";

const {
  REACT_APP_HANGMANGAME_HOST: HangManGameHostUrl,
  REACT_APP_TICTACTOEGAME_HOST: TicTacToeGameHostUrl
} = process.env;

function Home({ history }) {
  const navigate = useNavigate();

  const onClickGameButton = (game) => (event) => {
    navigate(`/${game}`);
  }

  return (
    <div className={styles.home}>
      <div className={styles.home__header}>
        <h2>Choose your GAME!!</h2>
      </div>
      <div className={styles.home__actioncontainer}>
        <button className={styles.home__actioncontainer__button} onClick={onClickGameButton(GameType.HangMan.name)}>
          {GameType.HangMan.title}
        </button>
        <button className={styles.home__actioncontainer__button} onClick={onClickGameButton(GameType.TicTacToe.name)}>
          {GameType.TicTacToe.title}
        </button>
      </div>
    </div>
  );
}

function App() {
  const history = createBrowserHistory();


  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.app__header}>
          <h1 className={styles.app__header__heading}><Link to="/">My Micro Front-End App</Link></h1>
        </header>
        <div className={styles.app__body}>
          <Routes>
            <Route exact path="/" element={<Home history={history} />} />
            <Route exact path={`/${GameType.HangMan.name}`} element={<GameComponent gameName={GameType.HangMan.name} componentHostUrl={HangManGameHostUrl} history={history} />} />
            <Route exact path={`/${GameType.TicTacToe.name}`} element={<GameComponent gameName={GameType.TicTacToe.name} componentHostUrl={TicTacToeGameHostUrl} history={history} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
