import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Knowledge',
    Svg: require('@site/static/img/knowledge.svg').default,
    description: (
      <>
        A collection of knowledge for learning how to work with healthcare data.
      </>
    ),
  },
  {
    title: 'Code',
    Svg: require('@site/static/img/code.svg').default,
    description: (
      <>
        A collection of GitHub repositories that make it easier to work with healthcare data.
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
        A Slack community where we can learn from each other about working with healthcare data.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
