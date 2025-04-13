import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import timerSound1 from "./timerSound1.wav";
import timerSound2 from "./timerSound2.wav";
import timerSound3 from "./timerSound3.mp3";



export default function Clock({settings}) {
  const [p1Time, setP1Time] = useState(settings.p1Time);
  const [p2Time, setP2Time] = useState(settings.p2Time);
  const [p1Byoyomi] = useState(settings.p1Byoyomi);
  const [p2Byoyomi] = useState(settings.p2Byoyomi);
  const [isP1ByoyomiMode, setIsP1ByoyomiMode] = useState(false);
  const [isP2ByoyomiMode, setIsP2ByoyomiMode] = useState(false);
  const [p1TimeForDisplay, setP1TimeForDisplay] = useState(settings.p1Time);
  const [p2TimeForDisplay, setP2TimeForDisplay] = useState(settings.p2Time);

  const [playTimerSound1] = useSound(timerSound1);
  const [playTimerSound2, {stop}] = useSound(timerSound2, {volume: 0.5});
  const [playTimerSound3] = useSound(timerSound3);

  const [p, setP] = useState(null);
  const [timer, setTimer] = useState(null);
  const [wasGameOver, setWasGameOver] = useState(false);

  function setTurn(whoDidPress) {
    let newP;
    newP = whoDidPress === "p1" ? "p2" : "p1";
    if (newP === p) return;

    if (newP === "p1") {
      if (isP1ByoyomiMode) {
        setP1Time(p1Byoyomi);
      }
    }else{
      if (isP2ByoyomiMode) {
        setP2Time(p2Byoyomi);
      }
    }
    startTimer(newP);
    setP(newP);
    playTimerSound3();
  }

  useEffect(() => {
    if (wasGameOver) {
      clearInterval(timer);
      stop();
    }
  }, [wasGameOver]);

  useEffect(() => {
    let time = p === "p1" ? p1Time : p2Time;
    if (time === 0) {
      if (p === "p1") { 
        if (!isP1ByoyomiMode && p1Byoyomi !== 0) {
          setIsP1ByoyomiMode(true);
          setP1Time(p1Byoyomi);
        }else{
          setWasGameOver(true);
        } 
      }else{
        if (!isP2ByoyomiMode && p2Byoyomi !== 0) {
          setIsP2ByoyomiMode(true);
          setP2Time(p2Byoyomi);
        }else{
          setWasGameOver(true);
        }
      }
    }
    if (time === 10 || time === 20 || time === 30) {
      playTimerSound1();
    }else if ((p === "p1" && isP1ByoyomiMode) || (p === "p2" && isP2ByoyomiMode) || (p === "p1" && p1Byoyomi === 0) || (p === "p2" && p2Byoyomi === 0)) {
      if (time % 1 === 0 && time >= 6 && time <= 9) {
        playTimerSound1();
      }else if (time % 1 === 0 && time <= 5) {
        stop();
        playTimerSound2();
      }
    }

    if (isP1ByoyomiMode) {   
      setP1TimeForDisplay(p1Time); 
    }else{
      let sec = p1Time % 60;
      let min = Math.floor(p1Time / 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      setP1TimeForDisplay(min + ":" + sec);
    }

    if (isP2ByoyomiMode) {   
      setP2TimeForDisplay(p2Time); 
    }else{
      let sec = p2Time % 60;
      let min = Math.floor(p2Time / 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      setP2TimeForDisplay(min + ":" + sec);
    }
  }, [p1Time,p2Time, p]);


  function countDown(turnP) {
    if (turnP === "p1") {
      setP1Time((p1Time) => p1Time - 1);
    }else{
      setP2Time((p2Time) => p2Time - 1);
    }
  }

  function startTimer(turnP) {
    stop();
    clearInterval(timer);
    setTimer(setInterval(() => countDown(turnP), 1000));
  }
  
  /*return <>
  <div id="wasGameOver">{wasGameOver ? "Game Over" : ""}</div>
  <div id="turnDisplay">{p}</div>
  <div id="p1TimeDisplay">{isP1ByoyomiMode + "," + p1Time}</div>
  <div id="p2TimeDisplay">{isP2ByoyomiMode + "," + p2Time}</div>
  <Button player={"p1"} handleClick={() => setTurn("p1")}>p1</Button>
  <Button player={"p2"} handleClick={() => setTurn("p2")}>p2</Button>
  </>*/
  return <div id="clockContainer">
  <div id="p1TimeDisplay" onMouseDown={() => {if (!wasGameOver) setTurn("p1")}}
    style={{color:p === "p1" ? "black" : "silver"}}><span className="timeWrapper">{p1TimeForDisplay}</span></div>

  <div id="p2TimeDisplay" onMouseDown={() => {if (!wasGameOver) setTurn("p2")}}
    style={{color:p === "p2" ? "black" : "silver"}}><span className="timeWrapper">{p2TimeForDisplay}</span></div>
  </div>
}
