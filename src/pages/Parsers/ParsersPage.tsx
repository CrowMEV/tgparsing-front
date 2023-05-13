import React, { useState } from 'react';
import ParsersPageHeader from './Header/ParsersPageHeader';
import Geolocation from '../../components/parsers/geolocation/Geolocation';
import Participants from '../../components/parsers/participants/Participants';
import Activities from '../../components/parsers/activities/Activities';

import styles from './parsers.module.sass';
import Navbar from './Navigation/Navbar';

const PARSERS = [
  { title: 'geolocation', icon: 'location_on' },
  { title: 'participants', icon: 'groups' },
  { title: 'activities', icon: 'pool' },
];

const ParsersPage = () => {
  const [currentParser, setCurrentParser] = useState(PARSERS[0].title);

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <ParsersPageHeader
          parsers={PARSERS}
          currentParser={currentParser}
          setCurrentParser={setCurrentParser}
        />
        {(() => {
          switch (currentParser) {
            case PARSERS[0].title:
              return <Geolocation />;
            case PARSERS[1].title:
              return <Participants />;
            case PARSERS[2].title:
              return <Activities />;
            default:
              return null;
          }
        })()}
      </main>
    </>
  );
};

export default ParsersPage;
