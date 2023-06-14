import { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './navTabs.module.sass';

interface PropTypes {
  children: ReactElement[];
  currentElementIndex: number;
}

const NavTabs = ({ children, currentElementIndex }: PropTypes) => {
  const tabsRef = useRef<HTMLDivElement[] | null[]>([]);

  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    function setPosition() {
      const currentTab = tabsRef.current[currentElementIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }
    setPosition();
  }, [currentElementIndex]);

  let startKey = 0;

  return (
    <>
      {children.map((child, index) => (
        <div ref={(el) => (tabsRef.current[index] = el)} key={startKey++}>
          {child}
        </div>
      ))}
      <span
        className={styles.underline}
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </>
  );
};

export default NavTabs;
