import React from 'react';
import BottomSheetModal from './index';

class Test extends React.Component {
  componentWillMount() {
    this.setState({ showLarge: false, showSmall: false });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ showSmall: !this.state.showSmall })}>
          Show small content modal
        </button>

        <button onClick={() => this.setState({ showLarge: !this.state.showLarge })}>
          Show large content modal
        </button>

        <BottomSheetModal open={this.state.showSmall} onRequestClose={() => this.setState({ showSmall: false })}>
          <div>
            <h1>Bottom sheet modal content</h1>
            <ul>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
            </ul>
            <br />
            <br />
            <br />
          </div>
        </BottomSheetModal>

        <BottomSheetModal open={this.state.showLarge} onRequestClose={() => this.setState({ showLarge: false })}>
          <div>
            <h1>Bottom sheet modal content</h1>
            <button onClick={() => this.setState({ showLarge: !this.state.showLarge })}>
              Click me to close the modal
            </button>
            <ul>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Swipping down will close the modal</li>
              <li>Clicking on the grey area will close the modal</li>
            </ul>
            <br />
            <br />
            <br />
          </div>
        </BottomSheetModal>
      </div>
    );
  }
}


export default () => {
	return <Test />;
};
