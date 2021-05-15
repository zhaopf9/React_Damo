import * as React from 'react';
import styles from './index.less';

export default function() {
  return (
    <div className="pageMain">
      <div className="pageContent">
        <div className={styles.errorContentImg}><img src={require('../images/500.jpg')}/></div>
        <div className={styles.errorContentText}>服务器异常请稍后重试！</div>
      </div>
    </div>
  );
}
