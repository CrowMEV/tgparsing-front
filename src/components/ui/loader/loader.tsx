import { FC } from 'react';
import styles from './loader.module.sass';

const Loader: FC<{ width: number; height: number }> = ({ width, height }) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Loader;
