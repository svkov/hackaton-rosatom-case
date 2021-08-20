import React from 'react';

class MainScreen extends React.Component {
    render() {
        return (
             <div>Hello, {this.props.file_id}!</div>
        );
    }
}

export default MainScreen;