import React from 'react';
import {
  Motion,
  spring
} from 'react-motion';
import Measure from 'react-measure';
import { getWindowHeight } from '../helpers/window';
import styled from 'styled-components';

const BottomSheetWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, ${(props) => props.opacity});
  display: flex;
  align-items: flex-end;
  z-index: ${(props) => props.zIndex};
`;

const ContentWrapper = styled.div`
  transform: translateY(${(props) => props.translateY}px);
`;

const InnerContentWrapper = styled.div`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #FFF;
  max-height: ${(props) => props.maxHeight};
  width: 100vw;
`;

/**
 * NOTE:: Dont use the same modal to switch between two contents of much different height
 * This will cause the modal open animation when switching to not be perfect
 * Instead USE TWO DIFFERENT MODALS.. Dont worry about performance we dont render most of
 * the modal content when it's hidden.... 
 */
export default class BottomSheetModal extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    open: React.PropTypes.bool,
    // This method will be called when this component requests itself to be closed
    onRequestClose: React.PropTypes.func.isRequired,
    zIndex: React.PropTypes.number,
    maxHeight: React.PropTypes.string,
  };

  static defaultProps = {
    open: false,
    maxHeight: '100vh',
  };

  constructor(props) {
    super(props);
    this.contentClickedTime = 0;
    this.deltaY = 0;
  }

  componentWillMount() {
    this.setState({
      childrenHeight: 0,
    });
  }

  getInitialFrame() {
    return {
      translateY: this.state.childrenHeight,
      opacity: 0,
    };
  }

  calculateNextFrame() {
    if(this.props.open) {
      return {
        translateY: spring(0),
        opacity: spring(0.5),
      };
    } else {
      return {
        // First time to open the bottom sheet the childrenHeight will be 0
        // so we have to add any number (the window height makes the most sense)
        // until the children has been rendered and the height has been set in state
        translateY: spring(this.state.childrenHeight || getWindowHeight()),
        opacity: spring(0),
      };
    }
  }

  getBottomSheetContainerStyle(opacity) {
    return autoprefixer({
    });
  }

  onPanEnd(e) {
    if(this.lastDeltaY > 50) {
      this.props.onRequestClose();
    }
  }

  onPanStart(e) {
    this.lastDeltaY = 0;
  }

  onPan(e) {
    this.lastDeltaY = e.deltaY;
  }

  getCurrentTime() {
    return new Date().getTime();
  }

  onContainerClick = () => {
    // Wait to see if the content is clicked as well
    setTimeout(() => {
      // Check if content clicked time was greater than 100 millis
      // to make sure that the content wasnt clicked as well
      if((this.getCurrentTime() - this.contentClickedTime) > 100) {
        // Now request to close this sheet
        this.props.onRequestClose();
      }
    }, 50);
  }

  onContentClick = () => {
    this.contentClickedTime = this.getCurrentTime();
  }

  // Consider the animation has finished if the distance to leave the screen is less than 5px
  hasAnimationFinished(translateY) {
    return (this.state.childrenHeight - translateY) < 5;
  }

  renderChildren(translateY, opacity) {
    // If the animation has finished and requested animation was to hide the modal
    // Then we dont need to render the content 
    if(this.hasAnimationFinished(translateY) && !this.props.open) {
      return <div></div>;
    }

    return (
      <BottomSheetWrapper
        onClick={this.onContfainerClick}
        opacity={opacity}
        zIndex={this.props.zIndex}
      >
        <Measure
          whitelist={['height']}
          onMeasure={({ height }) => {
            this.setState({
              childrenHeight: height,
            });
          }}
        >
          <ContentWrapper
            translateY={translateY}
          >
            {this.props.bottomSheetHeader && this.props.bottomSheetHeader}
            <InnerContentWrapper
              className={this.props.className}
              onClick={this.onContentClick}
              maxHeight={this.props.maxHeight}
            >
              {this.props.children}
            </InnerContentWrapper>
          </ContentWrapper>
        </Measure>
      </BottomSheetWrapper>
    );
  }

  render = () => {
    return (
      <Motion
        defaultStyle={this.getInitialFrame()}
        style={this.calculateNextFrame()}>
        {({ translateY, opacity }) => this.renderChildren(translateY, opacity)}
      </Motion>
    );
  }
}