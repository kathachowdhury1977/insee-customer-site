import React, {Component} from 'react';
import ShowMoreText from 'react-show-more-text';
import { withTranslation, useTranslation } from "react-i18next";
 
 
class ReadMore extends Component {
    constructor(props){
        super(props);
    }
    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    
 
    render() {

        return (
            <ShowMoreText
                
                lines={2}
                more={this.props.more}
                less={this.props.less}
                className={this.props.class}
                anchorClass='my-anchor-css-class'
                onClick={this.executeOnClick}
                expanded={false}
                width={600}
            >
                 {this.props.text}
            </ShowMoreText>
        );
    }
}

export default withTranslation()(ReadMore);