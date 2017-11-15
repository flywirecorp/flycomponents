import React from 'react';
import Markdown from '../Markdown';
import README from '../../../../README.md';

const styles = {
  container: {
    padding: '0 2rem'
  }
};

const Home = () => {
  return (
    <div style={styles.container} className="markdown-body">
      <Markdown source={README} />
    </div>
  );
};

export default Home;
