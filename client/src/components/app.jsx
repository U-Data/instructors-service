import React from 'react';
import About from './about.jsx';
import More from './more.jsx';
import styles from '../../dist/styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: null,
    };
    this.update = this.update.bind(this);
    this.renderInstructors = this.renderInstructors.bind(this);
    this.renderCourses = this.renderCourses.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    fetch('/' + window.location.pathname.split('/')[2] + '/instructors')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          instructors: data,
        });
      });
  }

  renderInstructors() {
    let instructors;
    if (this.state.instructors) {
      instructors = [
        <div key={'header'} className={styles.aboutHeader}>
          {this.state.instructors.length > 1 ? 'About the instructors' : 'About the instructor'}
        </div>,
        this.state.instructors
          .map((inst, i) => <div key={i} className={styles.aboutInstructor}>
        < About key={i} info={this.state.instructors[i].instInfo} /></div>),
      ];
    } else {
      instructors = null;
    }
    return instructors;
  }

  renderCourses() {
    let courses;
    if (this.state.instructors) {
      courses = this.state.instructors.slice(0, 3)
        .map((inst, i) => < More key={i} info={this.state.instructors[i]} />);
    } else {
      courses = null;
    }
    return courses;
  }

  handleDelete() {
    fetch('/courses', {
      method: 'DELETE',
    })
  }

  handleCreate() {
    fetch('/courses', {
      method: 'POST',
    })
  }

  handleUpdate() {
    fetch('/courses', {
      method: 'PATCH',
    })
  }

  render() {
    return (
      <div>
        <div className={styles.leftCol}>
          <div className={styles.aboutInstructors}>
            {this.renderInstructors()}
          </div>
          <div className={styles.instructorCourses}>
            {this.renderCourses()}
          </div>
        </div>
        <button onClick={this.handleDelete}>Delete course with largest id</button>
        <button onClick={this.handleCreate}>Create course with name 'New Course'</button>
        <button onClick={this.handleUpdate}>Update largest-id course's full_price to $999</button>
      </div>
    );
  }
}

export default App;
