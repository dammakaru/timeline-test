import {Timeline, TimelineEvent} from 'react-event-timeline'
import React, { Component } from 'react';
import * as axios from 'axios';
import TimelineContent from './TimelineContent';

class NewTimeline extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // this.showMessage = this.showMessage.bind(this);
        this.state = {
            array: [],
            timeline: "",
            istimelineLoading: true,
            // isColap:true
        };
    }

    // showMessage = () => {
    //     this.setState({isColap:!this.state.isColap});
    //     console.log();
    // }

    handleClick = (index, isClosed) => {

        if(!isClosed){
        //reset all values in array to false -> (sets all cards' "isOpen" attributes to false)
        this.state.array.fill(false);

        }

        //set only this card's collapse attribute to true
        var temp = this.state.array.slice();
        temp[index] = !(temp[index]);
        // replace array with modified temp array
        this.setState({array: temp});

    }


    componentDidMount() {
        axios({
            method: 'get',
            // array based api -> http://www.mocky.io/v2/5a6818df2d00002c3cbed081
            // http://www.mocky.io/v2/5a765d702e000067006ab27b
            url: 'http://www.mocky.io/v2/5a7688f02e000030006ab297', headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data.tabs[2];
                console.log(timeline);
                let itms = timeline.items;

                let arr = [];

                itms.map((e,i) => {
                    arr.push(false);
                    return true;
                });

                this.setState({
                    timeline: timeline,
                    istimelineLoading: false,
                    array: arr
                    
                });
            });

    }

    render(){

        let timelineTopStyle = {
            backgroundColor: 'rgba(0,0,0,0.8)', 
            height: 110, 
            width: 220,
            marginLeft: 10,
            padding: 10
        };

        if (this.state.istimelineLoading) {
            return <h2>Loading...</h2>;
        }
        else{
            
            return(
                
                <div style={{backgroundColor: '#f4f6f8', paddingTop: 10}}> 
                    <div style={timelineTopStyle}>
                        <h1 style={{color: 'white', textAlign: 'center'}}>
                            <span style={{color: 'white'}}>
                            Traci
                            </span>
                            <span style={{color: 'green'}}>
                            fied
                            </span> 
                        </h1>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Item ID: 1000</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Ordered by: Jhon Doe</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Ordered On: 18-01-2018</p>
                    
                    </div>
                    <div style={{paddingLeft: 30}}>
                        <Timeline>
                        {this.state.timeline.items.map((stage, index) => {

                            let titleText = (index+1)+". "+stage.title;
                            let descriptionText = stage.description;

                            var ico = (<svg height="50" width="35" >
                                            <image width="32" height="50" xlinkHref={stage.icon}  />    
                                        </svg>);
                                        

                            var stageData = stage.data;

                            return(
                                <TimelineEvent
                                    key={index}
                                    title={titleText}
                                    titleStyle={{fontSize:15, fontWeight: "bold"}}
                                    subtitle={descriptionText}
                                    subtitleStyle={{fontSize:15}}
                                    icon={ico}
                                    contentStyle={{fontSize:13}}
                                    bubbleStyle={{border: "none"}}
                                    // onClick={this.showMessage}
                                ><div id={index}>
                                    
                                    <TimelineContent 
                                        collapseArray={this.state.array} 
                                        collapseArrayKey={index} 
                                        data={stageData}
                                        componentID={"component"+index} 
                                        onClick={this.handleClick}
                                    />
                                </div>            
                                </TimelineEvent>                                    
                            );

                        })}
                        </Timeline>
                    </div>     
                </div>
            );    

        }

    }
    
}

export default NewTimeline;
