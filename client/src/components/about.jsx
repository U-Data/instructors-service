import React from 'react';
import PropTypes from 'prop-types';
import Stat from './stat.jsx';
import styles from '../../dist/styles/about.css';

const addCommas = (stat) => {
  const str = String(stat);
  if (str.length > 3) {
    const arr = str.split('');
    for (let i = arr.length - 3; i > 0; i -= 3) {
      arr.splice(i, 0, ',');
    }
    return arr.join('');
  }
  return str;
};

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: 'short',
      box: 'visible',
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderStats = this.renderStats.bind(this);
  }

  handleClick() {
    if (this.state.expand === 'short') {
      this.setState({
        expand: 'long',
        box: 'invisible',
      });
    } else {
      this.setState({
        expand: 'short',
        box: 'visible',
      });
    }
  }

  renderStats() {
    const rows = ['Instructor Rating', 'Reviews', 'Students', 'Courses'];
    return rows.map((title, i) => {
      const images = ['blackstar', 'chat', 'user', 'play'];
      const stats = [addCommas(this.props.info.rating),
        addCommas(this.props.info.reviews),
        addCommas(this.props.info.students),
        addCommas(this.props.info.courses)];

      return < Stat key={i} stat={stats[i]} text={title}
        image={`https://s3-us-west-1.amazonaws.com/u-demo/${images[i]}.png`} />;
    });
  }

  render() {
    return (
      <div className={styles.instructor}>
        <div className={styles.infoPhoto}>
          <img className={styles.instructorPhoto} src={this.props.info.photo_url}></img>
          <table className={styles.instructorInfo}>
            <tbody>
              {this.renderStats()}
            </tbody>
          </table>
        </div>

        <div className={styles.titleBlurb}>
          <div className={styles.instructorName}>{this.props.info.inst_name}</div>
          <div className={styles.instructorTitle}>{this.props.info.title}</div>
          <div className={`${styles.instructorBlurb} ${styles[this.state.expand]}`}>
              {this.props.info.blurb.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            <div className={`${styles.moreContainer} ${styles[this.state.box]}`}>
              <div className={styles.moreBlurb} onClick={this.handleClick}>+ See more</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;

About.propTypes = {
  info: PropTypes.shape({
    photo_url: PropTypes.string,
    // rating: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    students: PropTypes.number,
    courses: PropTypes.number,
    inst_name: PropTypes.string,
    title: PropTypes.string,
    blurb: PropTypes.string,
  }),
};
