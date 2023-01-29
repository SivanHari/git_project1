import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, SafeAreaView, ScrollView, Vibration } from 'react-native'
import 'react-native-get-random-values'

// You can import from local files
import AssetExample from './components/AssetExample';

export default function App(props) {
  const [json, setJson] = React.useState({});
  const [question, setQuestion] = useState('begin')
  const [score, setScore] = useState(0)
  const [hide, setHide] = useState(false)
  const [right, setRight] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [key, setKey] = useState('')
  const duration = 600
  var startkey = [];
          
  React.useEffect(() => {
    // write your code here, it's like componentWillMount
    async function checkData() {
    var axios = require('axios');
    var data = JSON.stringify({
        "collection": "quizjson",
        "database": "quizdb",
        "dataSource": "Cluster0",
        "filter": { "quizid":"d" }
    });
 
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-iflmd/endpoint/data/beta/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'hcBmTTM3zsakPIGeH0Ypv3IqdHekn8ubNJQzPtpOpnGvLguZLReKpc61E6Up8Flk'
        },
        data : data
    };
    let keydata= await axios(config);
    //console.log("keydata",keydata.data.document.quiztitles);
        // .then(function (response) {
        //   json= JSON.parse(JSON.stringify(response.data.document));
        //   console.log("response",json.quiztitles.length)
          
        //   //dbdata=(response.data.document)
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        //let findaljson=
        setJson(keydata.data.document);
        setKey(keydata.data.document.quiztitles[0])
      }
        //console.log(json);
      //  const [key, setKey] = useState(json.quiztitles[0])
        //console.log("test",key)
        checkData();
    }, [])

  //let json={}
  // const getData= async ()=>{
  //   var axios = require('axios');
  //   var data = JSON.stringify({
  //       "collection": "quizjson",
  //       "database": "quizdb",
  //       "dataSource": "Cluster0",
  //       "filter": { "quiztitles":["Reasoning","Java"] }
  //   });
 
  //   var config = {
  //       method: 'post',
  //       url: 'https://data.mongodb-api.com/app/data-iflmd/endpoint/data/beta/action/findOne',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Request-Headers': '*',
  //           'api-key': 'hcBmTTM3zsakPIGeH0Ypv3IqdHekn8ubNJQzPtpOpnGvLguZLReKpc61E6Up8Flk'
  //       },
  //       data : data
  //   };
  //    let dbdata={}           
  //    dbdata= await axios(config)
  //       .then(function (response) {
  //         console.log(response.data.document);
  //         //dbdata=(response.data.document)
  //       })
  //       .catch(function (error) {
  //           console.log(error);
  //       });
  //   return dbdata;
             
  // }

  // json=getData()
  //if(json.hasOwnProperty('quiztitles'))
  //console.log("jsonQuiz",json);
  const afterAnswering = () => {
    setHide(false)
    setRight(false)
    setWrong(false)
  }

 

  const nextQuestion = () => {
   if(question > json[key].length-2) {
      setQuestion('summary')
      afterAnswering()
    }else{
      setQuestion(question+1)
      afterAnswering()
    }
  }

  const rightAnswer = () => {
    setScore(score+1)
    setHide(true)
    setRight(true)
  }
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  if(json.hasOwnProperty('quiztitles'))
  for(let i = 0; i < json.quiztitles.length; i++){
           
    startkey.push(
      <SafeAreaView>
      <Button onPress={() =>startQuiz(json.quiztitles[i])}>
          <ButtonText  key={uuid()}>{json.quiztitles[i]}</ButtonText>
        </Button>
        </SafeAreaView>
    )
  }
  //console.log( "startkey",startkey);
  const startQuiz = (quizid) => {
   // setKey(quizid);
   console.log(json[key].length);
   setKey(quizid)
    setQuestion(0);
  }
  //if(json.hasOwnProperty('quiztitles'))

  //console.log("getdata",getData());
  const wrongAnswer = () => {
    setHide(true)
    setWrong(true)
    return Vibration.vibrate(duration)
  }
  const checkAnswer = (correct,optionselected) => {
    //console.log(correct,optionselected)
    if(correct===optionselected){
     
      return rightAnswer
    }else{
      return wrongAnswer
    }
  }

  const restartQuiz = () => {
    setScore(0)
    setQuestion('begin')
  }
  //key
  var questionkey = [];
  if(json.hasOwnProperty(key))
  for(let i = 0; i < json[key].length; i++){

    questionkey.push(
      <View>
        <Container>
        <Title key={uuid()}>{json[key][i].title}</Title>
        <Title key={uuid()}>{json[key][i].question}</Title>
        {!hide && (
        <View>
          <Button onPress={checkAnswer(json[key][i].option1,json[key][i].correct)}>
            <ButtonText key={uuid()}>{json[key][i].option1}</ButtonText>
          </Button>
          <Button onPress={checkAnswer(json[key][i].option2,json[key][i].correct)}>
            <ButtonText   key={uuid()}>{json[key][i].option2}</ButtonText>
          </Button>
          <Button onPress={checkAnswer(json[key][i].option3,json[key][i].correct)}>
            <ButtonText  key={uuid()}>{json[key][i].option3}</ButtonText>
          </Button>
          <Button onPress={checkAnswer(json[key][i].option4,json[key][i].correct)}>
            <ButtonText  key={uuid()}>{json[key][i].option4}</ButtonText>
          </Button>
        </View>
        )}
        {right && (
          <TitleRight>Correct answer! Please go to the next question</TitleRight>
        )}
        {wrong && (
          <TitleWrong>Wrong answer! Try next question</TitleWrong>
        )}
        <Score>{score} points</Score>
        </Container>
      </View>
    )
        }
    //key
    var summarykey = [];
    if(json.hasOwnProperty(key)){
      summarykey = [];
    for(let i = 0; i < json[key].length; i++){
  
      summarykey.push(
        <Summary key={uuid()}>{json[key][i].title}:{"\t"}{json[key][i].question}{"\n"} Answer:{"\t"}{json[key][i].correct}</Summary>
      )
    }
  }
  
    return (
      
      <Container>
      {question === 'begin' && (
      <View>
        <Container>
       {startkey}
        </Container>
      </View>
    )}
     
    {questionkey[question]}

    {question!=='begin' && (
      <NextButton onPress={nextQuestion}>
        <ButtonText >Next</ButtonText>
      </NextButton>
    )} 

    {question === 'summary' && (
      <View>
        <Container>
        <Title>Thank you for completing the quiz!</Title>
        {score>= questionkey.length && (
          <Title>You're a star!</Title>
        )}
        <Title>Your final score is {score} / {questionkey.length} points</Title>
        <Title></Title>
        <Title>The right answers are:</Title>
         {summarykey}
        <Title></Title>
        <Button onPress={restartQuiz}>
          <ButtonText >Back</ButtonText>
        </Button>
        </Container>
      </View>
    )}
    </Container>
  )
}

const Container = styled.View`
  align-items: center;
  background-color: #ddedeb;
  color: green;
  flex: 1;
  justify-content: center;
`

const Title = styled.Text`
  color: #544980;
  font-size: 20px;
  margin-bottom: 3px;
  margin-left:3px;
  margin-right:2px
`

const TitleRight = styled(Title)`
  color: green;
`

const TitleWrong = styled(Title)`
  color: red;
`

const Score = styled(Title)`
  padding-top: 10px;
`

const Summary = styled(Title)`
  border: 2px solid;
  font-size: 16px;
  padding-bottom: 2px;
  margin-left:5px;
  margin-right:3px
`

const Button = styled.TouchableOpacity`
  background: #88d5e3;
  border-radius: 20px;
  margin-bottom: 5px;
  padding: 10px 20px;
`

const ButtonText = styled.Text`
  color: #1f2e1f;
  font-size: 18px;
`

const NextButton = styled(Button)`
  bottom: 40px;
  position: absolute;
`