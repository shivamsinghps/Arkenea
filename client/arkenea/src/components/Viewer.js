import React, { Component } from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport'

// https://github.com/conorhastings/react-syntax-highlighter

class ExamplePageBasic extends Component {
  state = {
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4  },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1},
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: [
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
    ],
  };

  render() {
    return (
      <div>
        <h2>Basic eg</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <CornerstoneViewport
            tools={this.state.tools}
            imageIds={this.state.imageIds}
            style={{ minWidth: '60vw', height: '512px', flex: '1' }}
          />
        </div>
      </div>
    );
  }
}

export default ExamplePageBasic;