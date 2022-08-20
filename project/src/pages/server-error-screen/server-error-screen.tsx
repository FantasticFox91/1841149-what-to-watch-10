import './server-error-screen.css';

function ServerErrorScreen(): JSX.Element {
  return (
    <section className="film-card film-card--full server-error">
      <div className="film-card__header">
        <div className="film-card__bg">
        </div>

        <h1 className="visually-hidden">WTW</h1>

      </div>
      <div className='server-error__container'>
        <div className="server-error__message">
          <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 418.9 418.9" xmlSpace="preserve">
            <path d="M189 234c8-5 16-12 22-19l24 14 22-38-24-14c3-9 5-19 5-29l28-5-8-43-27 5c-4-9-9-18-15-26l18-21-34-28-17 21c-9-4-19-8-28-10V13h-44v28c-10 2-19 6-28 10L65 30 32 58l18 21c-6 8-11 17-15 26l-27-5-8 43 27 5c1 10 2 20 5 29L8 191l22 38 24-14c7 7 14 14 23 19l-9 26 40 15 10-26a106 106 0 0 0 30 0l9 26 41-15-9-26zm-56-34a56 56 0 1 1 0-111 56 56 0 0 1 0 111zM376 267l-19 6c-3-6-8-12-13-17l11-17-27-16-10 17c-7-3-14-4-21-5l-3-20-31 5 3 19-19 10-15-13-20 23 14 14-8 19h-20l-1 31h20c1 8 4 14 7 21l-16 12 19 24 16-12c5 5 11 9 18 12l-4 19 30 6 4-19a76 76 0 0 0 22-3l9 18 27-15-9-17c6-5 10-10 14-16l19 7 11-29-18-7c1-7 2-14 1-21l19-7-10-29zm-79 83a40 40 0 1 1-11-79 40 40 0 0 1 11 79zM418 159l1-25h-16c-1-6-2-11-5-16l12-10-15-19-12 9-15-9 4-15-25-5-3 15c-5 0-11 1-16 3l-8-14-21 12 7 14c-4 3-8 7-11 12l-15-6-9 23 15 6-1 17-15 5 8 23 15-5c3 5 6 10 10 13l-8 14 21 13 8-14 17 4 2 15 24-3-2-16a60 60 0 0 0 15-8l12 11 16-19-12-10 7-16 15 1zm-59 13a32 32 0 1 1-29-56 32 32 0 0 1 29 56z"/>
          </svg>
          <h2 className='server-error__text'>
            Something wrong with server
            <br />
          </h2>
          <p> We are working on it. Please, come back later.</p>
        </div>
      </div>
    </section>
  );
}

export default ServerErrorScreen;
