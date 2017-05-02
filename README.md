react-bottom-sheet
---------------

Installation
------------
```
$ npm install react-bottom-sheet --save
```

[Demos](http://bitriddler.com/playground/bottom-sheet)
--------------

Example
--------------

```javascript
import React from 'react';
import BottomSheet from 'react-bottom-sheet';

export default class Test extends React.Component {

  componentWillMount() {
    this.setState({
      showSheet: false,
    });
  }

  render() {
    return (
      <BottomSheet open={this.state.showSheet} onRequestClose={() => this.setState({ showSheet: false })}>
        <div>
          <h1>Bottom sheet modal content</h1>
          <ul>
            <li>Animates from bottom to top</li>
            <li>If the content height is more than the height of the device it will be scrollable.</li>
            <li>Clicking on the grey area will close the modal</li>
          </ul>
        </div>
      </BottomSheet>
    );  
  }
} 
```



| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string |  | Bottom sheet content className. |
| open | bool | false | If set to `true` the bottom sheet will open. |
| onRequestClose* | func |  | This method will be called when an action is made to close this bottom sheet.<br />For example clicking on the overlay. |
| zIndex | number |  | css z-index value for the bottom sheet |
| maxHeight | string | '100vh' | css max-height value for the bottom sheet.<br />Numbers are not allowed, you have to pass 10px as a string instead |
| minHeight | string |  | css min-height value for the bottom sheet.<br />Numbers are not allowed, you have to pass 10px as a string instead |
| bottomSheetHeader | element |  | If passed this element will render above the content. |
| bottomSheetFooter | element |  | If passed this element will render under the content. |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT
