import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.sass';

type ParsersPageHeaderProps = {
  parsers: Array<{ title: string; icon: string }>;
  currentParser: string;
  setCurrentParser: React.Dispatch<React.SetStateAction<string>>;
};

const ParsersPageHeader = ({
  parsers,
  currentParser,
  setCurrentParser,
}: ParsersPageHeaderProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <header className={styles.header}>
      <ul>
        {parsers.map((parser) => (
          <li key={parser.title}>
            <Link
              className={
                currentParser === parser.title ? styles.activeButton : ''
              }
              to="#"
              onClick={() => setCurrentParser(parser.title)}
            >
              <span className="material-icons-outlined">{parser.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setVisible(!visible)}>
        <span className="material-icons-outlined">
          {visible ? 'star' : 'star_border'}
        </span>
      </button>
    </header>
  );
};

export default ParsersPageHeader;
