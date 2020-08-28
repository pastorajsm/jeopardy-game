import React, { Component } from "react";
//import our service
import JeopardyService from "../../JeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {
        id: null,
        answer: "",
        question: "",
        value: null,
        airdate: "",
        created_at: "",
        updated_at: "",
        category_id: null,
        game_id: null,
        invalid_count: null,
        category: {
          id: null,
          title: "",
          created_at: "",
          updated_at: "",
          clues_count: null,
        },
      },

      userAnswer: "",
      score: 0,
    };
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    const userAnswer = event.target.value;
    this.setState({ userAnswer });
  };

  handleClick = (event) => {
    let score = this.state.score;
    let value = this.state.data.value;
    if (this.state.userAnswer === this.state.data.answer) {
      score += value;
    } else {
      score -= value;
    }
    this.setState({ score, userAnswer: "" });
    this.getNewQuestion();
  };
  //display the results on the screen
  render() {
    return (
      <div>
        <div>
          <strong>Score: </strong> {this.state.score} <br />
          <strong>Question: </strong> {this.state.data.question} <br />
          <strong>Value: </strong> {this.state.data.value} <br />
          <strong>Category: </strong> {this.state.data.category.title} <br />
          <input
            type="text"
            name="userAnswer"
            value={this.state.userAnswer}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleClick}>Answer</button>
      </div>
    );
  }
}
export default Jeopardy;
