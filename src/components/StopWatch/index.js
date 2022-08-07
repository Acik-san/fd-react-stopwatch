import React, { Component } from "react";
import styles from "./StopWatch.module.css";

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date(null, null, null, 0, 0, 0) };
    this.intervalId = null;
  }
  tick = () => {
    this.setState((state) => {
      const { time } = state;
      const newTime = new Date(time.getTime() + 1000);
      return { time: newTime };
    });
  };
  start = () => {
    if (this.intervalId === null) {
      this.intervalId = setTimeout(this.tick, 1000);
    }
  };
  stop = () => {
    clearTimeout(this.intervalId);
    this.intervalId = null;
  };
  reset = () => {
    this.stop();
    this.setState({ time: new Date(null, null, null, 0, 0, 0) });
  };

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.state;
    if (
      time.getTime() !== prevState.time.getTime() &&
      this.intervalId !== null
    ) {
      this.intervalId = setTimeout(this.tick, 1000);
    }
  }
  componentWillUnmount() {
    this.reset();
  }

  render() {
    const { time } = this.state;
    return (
      <article className={styles.container}>
        <h2 className={styles.timer}>{time.toLocaleTimeString("en-GB")}</h2>
        <div>
          <button className={styles.btn} onClick={this.start}>
            start
          </button>
          <button className={styles.btn} onClick={this.stop}>
            stop
          </button>
          <button className={styles.btn} onClick={this.reset}>
            reset
          </button>
        </div>
      </article>
    );
  }
}

export default StopWatch;
