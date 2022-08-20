import { useState } from 'react';
import Details from '../details/details';
import Overview from '../overview/overview';
import Reviews from '../reviews/reviews';

enum TabsName {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews',
}

function Tabs(): JSX.Element {
  const [activeTab, setActiveTab] = useState(TabsName.OVERVIEW);
  const onTabClickHandler = (e: React.MouseEvent) => {
    if (e.currentTarget.textContent !== null) {
      switch(e.currentTarget.textContent) {
        case TabsName.OVERVIEW:
          setActiveTab(TabsName.OVERVIEW);
          break;
        case TabsName.DETAILS:
          setActiveTab(TabsName.DETAILS);
          break;
        case TabsName.REVIEWS:
          setActiveTab(TabsName.REVIEWS);
          break;
      }
    }
  };

  const renderSwitch = (tab: string) => {
    switch(tab) {
      case TabsName.OVERVIEW:
        return <Overview />;
      case TabsName.DETAILS:
        return <Details />;
      case TabsName.REVIEWS:
        return <Reviews />;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={activeTab === 'Overview' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            data-testid="Overview"
          >
            <button className="film-nav__link" onClick={onTabClickHandler}>Overview</button>
          </li>
          <li
            className={activeTab === 'Details' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            data-testid="Details"
          >
            <button className="film-nav__link" onClick={onTabClickHandler}>Details</button>
          </li>
          <li
            className={activeTab === 'Reviews' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            data-testid="Reviews"
          >
            <button className="film-nav__link" onClick={onTabClickHandler}>Reviews</button>
          </li>
        </ul>
      </nav>
      {renderSwitch(activeTab)}
    </>
  );
}

export default Tabs;
