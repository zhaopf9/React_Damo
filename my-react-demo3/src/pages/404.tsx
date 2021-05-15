import * as React from 'react';
import styles from '@/pages/index.less';
import { Button } from 'antd';
import { history } from 'umi';

export default function () {
  return (
    <div className="pageMain">
      <div className={styles.errorContent}>
        <div className={styles.errorContentImg}><img src={require('../images/404.jpg')}/></div>
        <div className={styles.errorContentText}>您访问的页面不存在！</div>
        <div className={styles.errorContentBt}>
          <Button className={styles.errorContentBt} type="primary" onClick={()=>{
          history.goBack();
        }}>返回上一页面</Button>
          <Button className={styles.errorContentBt} type="primary" onClick={()=>{
            history.replace('/');
          }}>返回首页</Button>
        </div>
      </div>
    </div>
  );
}
