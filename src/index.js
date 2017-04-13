import React from 'react';
import ReactDOM from 'react-dom';
import BottomSheet from './BottomSheet/test';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<BottomSheet />, document.getElementById("root"));