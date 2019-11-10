import React from "react";
import Selection from "react-big-calendar/lib/Selection";
import PropTypes from 'prop-types';

class AutoYScroll extends React.Component {
  divRef = React.createRef();
  interval = null;
  shouldScroll = false;

  startScrollUp = () => {
    if (this.interval) return;
    this.interval = setInterval(this.scrollUp, 100);
  };

  startScrollDown = () => {
    if (this.interval) return;
    this.interval = setInterval(this.scrollDown, 100);
  };

  isScrolling = () => !!this.interval;

  stopScroll = () => {
    if (!this.isScrolling()) return;
    clearInterval(this.interval);
    this.interval = null;
  };

  scrollUp = () => (this.divRef.current.scrollTop -= 20);
  scrollDown = () => (this.divRef.current.scrollTop += 20);

  checkPage = (x, y) => {
    if (!this.shouldScroll) {
      return;
    }

    const { offsetHeight } = this.divRef.current;

    if (y < 25) {
      this.startScrollUp();
      return;
    }
    if (y > offsetHeight - 25) {
      this.startScrollDown();
      return;
    }
    this.stopScroll();
  };

  setScrollable = enable => {
    if (!enable) this.stopScroll();
    this.shouldScroll = enable;
  };

  preProcessMove = (pageX, pageY) => {
    //relative to element
    const { offsetLeft, offsetTop } = this.divRef.current;
    const x = pageX - offsetLeft;
    const y = pageY - offsetTop;
    this.checkPage(x, y);
  };

  onTouchMove = e => {
    const [{ pageX, pageY }] = e.touches;
    this.preProcessMove(pageX, pageY);
  };

  onMouseMove = e => {
    const { pageX, pageY } = e;
    this.preProcessMove(pageX, pageY);
  };

  componentWillUnmount() {
    if (this.selector) {
      this.selector.teardown();
      this.selector = null;
    }
    this.stopScroll();
  }

  componentDidMount() {
    const { longPressThreshold } = this.props;

    const selector = (this.selector = new Selection(() => this.divRef.current, {
      longPressThreshold: longPressThreshold || 300
    }));

    selector.on("beforeSelect", ({ x }) => {
      return x > 75;
    });

    selector.on("selecting", () => this.setScrollable(true));

    selector.on("select", () => this.setScrollable(false));

    selector.on("reset", () => this.setScrollable(false));
  }

  render() {
    const { children, style, className } = this.props;

    const mergedStyle = { overflowY: "auto", overflowX: "hidden", ...style };
    return (
      <div
        style={mergedStyle}
        className={className}
        ref={this.divRef}
        onTouchMove={this.onTouchMove}
        onMouseMove={this.onMouseMove}
      >
        {children}
      </div>
    );
  }
}

AutoYScroll.propTypes={
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  longPressThreshold: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default AutoYScroll;
