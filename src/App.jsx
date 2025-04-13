import Clock from "./Clock";
import StartButton from "./StartButton";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [DidTimerStart, setDidTimerStart] = useState(false);
  const [settings, setSettings] = useState({
    p1Time: null,
    p1Byoyomi: null,
    p2Time: null,
    p2Byoyomi: null
  });

  function timerSet() {
    let newSettings = {...settings};
    let p1TimeMinutes = parseInt(document.getElementById("p1TimeMinutes").value);
    let p1TimeSeconds = parseInt(document.getElementById("p1TimeSeconds").value);
    let p2TimeMinutes = parseInt(document.getElementById("p2TimeMinutes").value);
    let p2TimeSeconds = parseInt(document.getElementById("p2TimeSeconds").value);
    let p1Byoyomi = parseInt(document.getElementById("p1Byoyomi").value);
    let p2Byoyomi = parseInt(document.getElementById("p2Byoyomi").value);
    let timeJudge = (time) => {
      let result = true;
      if (typeof time === "number") {
        if (time < 0) {
          result = false;
        }
        if (Number.isNaN(time)) {
          result = false;
        }
      }else{
        result = false;
      }
      return result;
    }
    if (!timeJudge(p1TimeMinutes) || !timeJudge(p1TimeSeconds) || !timeJudge(p1Byoyomi) || !timeJudge(p2TimeMinutes) || !timeJudge(p2TimeSeconds) || !timeJudge(p2Byoyomi)) {
      alert("時間を正しく入力してください。");
      return;
    };
    if ((p1TimeMinutes === 0 && p1TimeSeconds === 0 && p1Byoyomi === 0) || (p2TimeMinutes === 0 && p2TimeSeconds === 0 && p2Byoyomi === 0)) {
      alert("時間を入力してください。");
      return;
    }
    newSettings.p1Time = p1TimeMinutes * 60 + p1TimeSeconds;
    newSettings.p2Time = p2TimeMinutes * 60 + p2TimeSeconds;
    newSettings.p1Byoyomi = p1Byoyomi;
    newSettings.p2Byoyomi = p2Byoyomi;
    setSettings(newSettings);
    setDidTimerStart(true);
  }

  if (DidTimerStart) {
    return <>
    <Clock settings={settings}/>
    </>
  }else{
    return <>
    <div id="settingsWrapper">
      <h1>Web対局時計</h1>
      <p>ウェブブラウザ上で動くシンプルな対局時計です。音が出ます。</p>
      <div>左側プレイヤー</div>
      <input type="number" id="p1TimeMinutes" placeholder="分"/>
      <input type="number" id="p1TimeSeconds" placeholder="秒"/>
      <input type="number" id="p1Byoyomi" placeholder="秒読み"/>
      <div>右側プレイヤー</div>
      <input type="number" id="p2TimeMinutes" placeholder="分"/>
      <input type="number" id="p2TimeSeconds" placeholder="秒"/>
      <input type="number" id="p2Byoyomi" placeholder="秒読み"/>
      <br/>
      <br/>
      <StartButton handleClick={timerSet}>スタート</StartButton>
    </div>
    </>
  }
}
