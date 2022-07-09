import React from 'react'

export default class Food extends React.PureComponent {
    state = {
        checked: false
    }

    componentDidMount() {
        console.log('did mount', this.props)
    }

    checkboxClicked = event => {
        this.setState({
            checked: event.target.checked
        })
    }

    ratingChanged = event => {
        if(!isNaN(event.target.value)) {
            this.setState({
                rating: event.target.value
            })
        }
    }

    onItemNameChanged = event => {
        this.props.setItemName(event.target.value, this.props.index)
    }

    render() {
        // return (
        //     <div>  
        //         <span>{this.props.index + 1}. {this.props.foodName} ({this.props.unit})</span><br/>
        //         <span>Barcode # {this.props.barcode}</span>
        //     </div>
        // )
        return (
            <div>
                <span className={this.state.checked ? 'good' : ''}>
                    <input
                        type="text"
                        value={this.props.foodName}
                        onChange={this.onItemNameChanged}
                    />
                </span>
                {this.state.rating && (this.state.rating + '/ 10')}
                <input 
                    type="checkbox" 
                    onChange={this.checkboxClicked} 
                />
                <input type="number" onChange={this.ratingChanged} />
            </div>
        )
    }
}