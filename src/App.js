import React from 'react';
import './App.css';


class App extends React.Component{
    state = {
        hour: 0,
        minute: 0,
        second : 0,
        btnDisabled: false,
        interval: "",
        intervalsStorage: [],
    };

    startClicked = () => {
        this.setState({
            btnDisabled: true,
        }); 
        let timer = setInterval(() => {
            const { second, minute, hour } = this.state;
            if(second === 59){
                if(minute === 59){
                    this.setState({
                        second: 0,
                        minute: 0,
                        hour: hour + 1,
                    });
                }
                else{
                    this.setState({
                        second: 0,
                        minute: minute + 1
                    })
                }
                
            }
            else {
                this.setState({
                    second: second + 1,
                });
            }
            
        }, 1000);
        this.setState({
            interval: timer,
        })
    };

    stopClicked = () => {
        clearInterval(this.state.interval);
        this.setState({
            btnDisabled: false,
        })
    };

    intervalClicked = () => {
        const { hour, minute, second, intervalsStorage } = this.state;
        intervalsStorage.push(`${hour} : ${minute} : ${second}`);
        this.setState({
            intervalsStorage,
        })
    };

    clearClicked = () => {
        this.stopClicked();
        this.setState({
            second: 0,
            minute: 0,
            hour: 0,
            intervalsStorage: [],
        })
    };
    render(){
        const { hour, minute, second, btnDisabled, intervalsStorage} = this.state;
        return(
            <div className='container'>
                <div className="container-md">
                <h1>Online Stopwatch</h1>
                <div className='timer-container'>
                    <button onClick={this.startClicked} 
                        disabled={btnDisabled}
                        >Start
                    </button>
                    <button onClick={this.stopClicked}
                        >Stop
                    </button> 
                    <button 
                        onClick={this.intervalClicked}
                        disabled={!btnDisabled}>
                            Interval
                        </button>
                    <button onClick={this.clearClicked}>Clear</button>
                </div>
                </div>

                <div className="watch-container">
                    <div className="box--container">
                        <p>{hour}</p>
                    </div>
                    <div className="box--container">
                        <p>{minute}</p>
                    </div>
                    <div className="box--container">
                        <p>{second}</p>
                    </div>
                </div>
                <div className="footer text-center">
                    {intervalsStorage.map((item, index) => <p>{index + 1} -> {item}</p>)}
                </div>
            </div>
        )
    }
}

export default App;