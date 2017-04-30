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
  width: 100vw;
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
  ${(props) => props.minHeight && `min-height: ${props.minHeight}`};
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
    /**
     * Bottom sheet content className.
     */
    className: React.PropTypes.string,
    /**
     * If set to `true` the bottom sheet will open.
     */
    open: React.PropTypes.bool,
    /**
     * This method will be called when an action is made to close this bottom sheet.
     * For example clicking on the overlay.
     */
    onRequestClose: React.PropTypes.func.isRequired,
    /**
     * css z-index value for the bottom sheet
     */
    zIndex: React.PropTypes.number,
    /**
     * css max-height value for the bottom sheet.
     * Numbers are not allowed, you have to pass 10px as a string instead
     */
    maxHeight: React.PropTypes.string,
    /**
     * css min-height value for the bottom sheet.
     * Numbers are not allowed, you have to pass 10px as a string instead
     */
    minHeight: React.PropTypes.string,
    /**
     * If passed this element will render above the content.
     */
    bottomSheetHeader: React.PropTypes.element,
    /**
     * If passed this element will render under the content.
     */
    bottomSheetFooter: React.PropTypes.element,
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

  getInitialFrame = () => {
    return {
      translateY: this.state.childrenHeight,
      opacity: 0,
    };
  }

  calculateNextFrame = () => {
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

  onPanEnd = (e) => {
    if(this.lastDeltaY > 50) {
      this.props.onRequestClose();
    }
  }

  onPanStart = (e) => {
    this.lastDeltaY = 0;
  }

  onPan = (e) => {
    this.lastDeltaY = e.deltaY;
  }

  getCurrentTime = () => new Date().getTime();

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
  hasAnimationFinished = (translateY) => {
    return (this.state.childrenHeight - translateY) < 5;
  }

  renderChildren = (translateY, opacity) => {
    // If the animation has finished and requested animation was to hide the modal
    // Then we dont need to render the content 
    if(this.hasAnimationFinished(translateY) && !this.props.open) {
      return <div></div>;
    }

    return (
      <BottomSheetWrapper
        onClick={this.onContainerClick}
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
              minHeight={this.props.minHeight}
              maxHeight={this.props.maxHeight}
            >
              {this.props.children}
            </InnerContentWrapper>
            {this.props.bottomSheetFooter && this.props.bottomSheetFooter}
          </ContentWrapper>
        </Measure>
      </BottomSheetWrapper>
    );
  }

  render = () => {
    return (
      <Motion
        defaultStyle={this.getInitialFrame()}
        style={this.calculateNextFrame()}
      >
        {({ translateY, opacity }) => this.renderChildren(translateY, opacity)}
      </Motion>
    );
  }
}
