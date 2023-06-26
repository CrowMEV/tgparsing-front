import { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './navTabs.module.sass';

interface PropTypes {
  children: ReactElement[];
  currentElementIndex: number;
  underlineClass?: string;
}

const NavTabs = ({
  children,
  currentElementIndex,
  underlineClass,
}: PropTypes) => {
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

    window.addEventListener('resize', setPosition);

    return () => window.removeEventListener('resize', setPosition);
  }, [currentElementIndex]);

  let startKey = 0;

  return (
    <>
      {children.map((child, index) => (
        <div ref={(el) => (tabsRef.current[index] = el)} key={startKey++}>
          {child}
        </div>
      ))}
      {currentElementIndex >= 0 && (
        <span
          className={`${styles.underline} ${underlineClass}`}
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      )}
    </>
  );
};

export default NavTabs;
