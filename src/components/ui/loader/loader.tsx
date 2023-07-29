import { FC } from 'react';
import styles from './loader.module.sass';

const Loader: FC<{ width?: number; height?: number }> = ({
  width = 40,
  height = 40,
}) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Loader;
