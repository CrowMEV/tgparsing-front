import React, { PropsWithChildren } from 'react';
import styles from './iconButton.module.sass';

const IconButton = ({ children }: PropsWithChildren) => {
  return <button className={styles.buttonIcon}>{children}</button>;
};

export default IconButton;
