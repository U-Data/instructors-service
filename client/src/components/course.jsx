import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../dist/styles/course.css';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      heart: 'unclicked',
    };
    this.mouseChange = this.mouseChange.bind(this);
    this.toggleClassName = this.toggleClassName.bind(this);
    this.renderHoverLayer = this.renderHoverLayer.bind(this);
  }

  mouseChange() {
    this.setState({ hover: !this.state.hover });
  }

  toggleClassName() {
    const newState = this.state.heart === 'unclicked' ? 'clicked' : 'unclicked';
    this.setState({
      heart: newState,
    });
  }

  renderHoverLayer() {
    let hover;
    if (this.state.hover) {
      hover = (<div className={styles.hoverLayer}>
        <img className={styles.instructorMiniPhoto} src={this.props.instInfo.photo_url}></img>
        <div className={styles.courseLectures}>{this.props.cInfo.lectures} lectures</div>
        <div className={styles.courseHours}>{this.props.cInfo.num_hours} hours video</div>
      </div>);
    } else {
      hover = null;
    }
    return hover;
  }

  render() {
    return (
      <div className={styles.instructorCourse}
      onMouseEnter={this.mouseChange} onMouseLeave={this.mouseChange}>

        <div className={styles.coursePhotoSection}
          style={{ backgroundImage: `url(${this.props.cInfo.photo_url})` }}>
          <i className={`far fa-heart fa-lg ${styles.bigHeart} ${styles[this.state.heart]}`}></i>
          <i onClick={this.toggleClassName}
            className={`fas fa-heart ${styles.smallHeart} ${styles[this.state.heart]}`}></i>
          {this.renderHoverLayer()}
        </div>

        <div className={styles.courseTextSection}>
          <span className={styles.courseName}>{this.props.cInfo.course_name}</span>
          <div className={styles.courseInstructor}>{this.props.instInfo.inst_name}</div>

          <div className={styles.courseStatsBar}>
            <img className={styles.emptyStars}
              src="https://s3.us-east-2.amazonaws.com/udemy-demo-tarik/emptyStars.png"></img>
            <div className={styles.starsContainer} style={ { width: `${this.props.cInfo.rating * 15}px` } }>
              <img className={styles.fullStars}
                src="https://s3.us-east-2.amazonaws.com/udemy-demo-tarik/filledStars.png"></img>
            </div>
            <span className={styles.courseRating}>{this.props.cInfo.rating}</span>
            <span className={styles.courseReviews}>({this.props.cInfo.reviews})</span>
          </div>

          <div className={styles.coursePriceBar}>
            <span className={styles.courseDiscPrice}>${this.props.cInfo.disc_price}</span>
            <span className={styles.courseFullPrice}>${this.props.cInfo.full_price}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Course;

Course.propTypes = {
  instInfo: PropTypes.shape({
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
  cInfo: PropTypes.shape({
    photo_url: PropTypes.string,
    lectures: PropTypes.number,
    num_hours: PropTypes.number,
    course_name: PropTypes.string,
    // rating: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    disc_price: PropTypes.string,
    full_price: PropTypes.string,
  }),
};
