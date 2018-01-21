import {Timeline, TimelineEvent} from 'react-event-timeline'
import React, { Component } from 'react';
import * as axios from 'axios';
import {
    TextStyle,
    Card,
    Page,
    Heading
} from '@shopify/polaris';

class NewTimeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeline: "",
            istimelineLoading: true
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://tracified-mock-api.herokuapp.com/Traceability_data/otp/customer-app', headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data[2];
                this.setState({
                    timeline: timeline,
                    istimelineLoading: false
                });
            });

    }

    render(){

        if (this.state.istimelineLoading) {
            return <h2>Loading...</h2>;
        }
        else{
            
            return(
                <div style={{backgroundColor: '#f4f6f8'}}>
                    <Page title="Trace Back Timeline" separator>    
                        <Timeline>
                        {this.state.timeline.items.map((stage, index) => {

                            let titleText = (index+1)+". "+stage.title;
                            let descriptionText = stage.description;

                            var ico = (<svg height="20" width="20" >
                                            <image width="20" height="20" xlinkHref={stage.icon}  />    
                                        </svg>);

                            return(
                                <TimelineEvent
                                    key={index}
                                    title={titleText}
                                    titleStyle={{fontSize:17}}
                                    subtitle={descriptionText}
                                    subtitleStyle={{fontSize:15}}
                                    icon={ico}
                                    iconColor="#6fba1c"
                                    contentStyle={{fontSize:13}}
                                >
                                    {

                                        Object.keys(stage.data).map(function (key) {
                                            return <div key={key}> {stage.data[key].title}</div>;
                                        })

                                    }
                                </TimelineEvent>                                    
                            );

                        })}
                        </Timeline>
                    </Page>
                </div>
            );    

        }

    }
    
}

export default NewTimeline;
