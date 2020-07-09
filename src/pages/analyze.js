import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Zdog from 'zdog';
import { VolumeFull } from "styled-icons/boxicons-solid/VolumeFull"
import { Minus } from "styled-icons/boxicons-regular/Minus"
import { Plus } from "styled-icons/boxicons-regular/Plus"
import { Microphone } from "styled-icons/boxicons-solid/Microphone"
import { Stop } from "styled-icons/fa-solid/Stop"
import posed from "react-pose"
import Meyda from "meyda"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ButtonMediumOrange from "../components/button-medium-orange"
import AnimateAudioVisualizer from '../components/audio-visualizer'

const AudioVisualizer = styled.div`
  position: relative;
  display: inline-block;
  // display: flex;
  margin-top: 100px;
  border-radius: 100%;
  width: 230px;
  height: 230px;

  background: linear-gradient(134.06deg, #23262a 15.56%, #23262a 83.35%);
  box-shadow: -16px -16px 30px rgba(81, 87, 97, 0.4),
    16px 16px 30px rgba(0, 0, 0, 0.35);
`

const ChildAudioVisualizer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 100%;
  width: 215px;
  height: 215px;

  background: linear-gradient(
    135.09deg,
    rgba(44, 48, 53, 0.182) 40.54%,
    rgba(30, 33, 36, 0.7) 83.33%
  );
  mix-blend-mode: multiply;
`

const TxtDesc = styled.p`
  margin: 30px 15px 15px;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`

const TxtResult = styled.p`
  margin: 15px;
  font-size: 32px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`

const ContainerVolume = styled.div`
  width: 100%;
  max-width: 315px;
  margin: 45px auto;
  display: flex;
  align-items: center;
`

const SliderVolume = styled.input`
  border: 0;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: linear-gradient(
    180deg,
    #101010 32.29%,
    #23262a 77.6%,
    #505862 91.15%
  );
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: all 0.2s;
  border: 0;

  &::-webkit-slider-runnable-track {
    margin-left: 2px;
    background: ${props =>
      "linear-gradient(90deg, #e55521 0%, #f5a42a " +
      (props.volume - 1) +
      "%, rgba(0, 0, 0, 0) " +
      props.volume +
      "%);"}
    height: 4px;
    border-radius: 5px;
    transition: all 0.2s;
    border: 0;
  }


  // Chrome
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    cursor: pointer;
    margin-top: -14px;
    border: 0;

    background: linear-gradient(133.83deg, #373b42 19.39%, #202326 87.47%);
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
  }

  // Browser
  &::-moz-range-track {
    margin-left: 5px;
    background: ${props =>
      "linear-gradient(90deg, #e55521 0%, #f5a42a " +
      (props.volume - 1) +
      "%, rgba(0, 0, 0, 0) " +
      props.volume +
      "%);"}
    height: 4px;
    border-radius: 5px;
    border: 0;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-moz-range-thumb {
    border: 0;
    // -webkit-appearance: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: -14px;

    background: linear-gradient(133.83deg, #373b42 19.39%, #202326 87.47%);
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
  }
`

const IconMinus = styled(Minus)`
  margin-right: 5px;
  color: white;
  opacity: 0.65;
  width: 12px;
  height: 12px;
`

const IconPlus = styled(Plus)`
  margin-left: 5px;
  color: white;
  opacity: 0.65;
  width: 12px;
  height: 12px;
`

const IconMic = styled(Microphone)`
  margin: auto;
  color: white;
  opacity: 0.65;
  width: 32px;
  height: 32px;
`

const IconStop = styled(Stop)`
  margin: auto;
  color: white;
  opacity: 0.65;
  width: 22px;
  height: 22px;
`

const Child = posed.div({
  visible: { y: 0, opacity: 1 },
  hidden: { y: 50, opacity: 0 },
  initialPose: "hidden",
})

const getMedia = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true
    })
  } catch (err) {
    console.log("Error:", err)
  }
}

function getMeanArray(arr) {
  let meanArr = arr[0].map((col, i) => {
    return arr.map(row => row[i]).reduce((acc, c) => acc + c, 0) / arr.length
  })
  return meanArr
}

const AnalyzePage = () => {
  const [valueSlider, setValueSlider] = React.useState(50)

  const handleSlider = e => {
    setValueSlider(parseFloat(e.target.value))
  }

  const [analyzer, setAnalyzer] = React.useState(null)
  const [mfccTotal, setMfccTotal] = React.useState([])

  // React.useLayoutEffect(() => {
  //   const audioContext = new AudioContext()
  //   audioContext.resume().then(() => {
  //     console.log("Playback resumed successfully")
  //   })
  //   getMedia().then(stream => {
  //     const source = audioContext.createMediaStreamSource(stream)
  //     setAnalyzer(
  //       Meyda.createMeydaAnalyzer({
  //         audioContext: audioContext,
  //         source: source,
  //         bufferSize: 512,
  //         featureExtractors: ["mfcc"],
  //         callback: features => {
  //           // mfccBulk.concat(features.mfcc)
  //           setMfccTotal(curr => curr.concat([features.mfcc]))
  //           console.log('meyda initialized')
  //           // console.log(features.mfcc)
  //         },
  //       })
  //     )

  //     // const hear = Meyda.createMeydaAnalyzer({
  //     //   audioContext: audioContext,
  //     //   source: source,
  //     //   bufferSize: 512,
  //     //   featureExtractors: ['loudness', 'spectralCentroid'],
  //     //   callback: features => {
  //     //     setLoudness(features.loudness)
  //     //     setSpectralCentroid(features.spectralCentroid)
  //     //     console.log('meyda working')
  //     //   },
  //     // })
  //     // hear.start()
  //   })

    
  // }, [])

  function getEmotionOutput(arr) {
    let output = arr.indexOf(Math.max(...arr))
    switch (output) {
      case 0:
        return 'Angry'
      case 1:
        return 'Neutral'
      // case 2:
      //   return 'Female Neutral'
      // case 3:
      //   return 'Female Sad'
      // case 4:
      //   return 'Male Angry'
      // case 5:
      //   return 'Male Happy'
      // case 6:
      //   return 'Male Neutral'
      // case 7:
      //   return 'Male Sad'
    }
  }

  React.useLayoutEffect(() => {
    // navigator.mediaDevices.getUserMedia({audio: true})
    if (analyzer) {
      analyzer.start()
    }
  }, [analyzer])

  const [stream, setStream] = React.useState(null)
  const [context, setContext] = React.useState(null)
  const [source, setSource] = React.useState(null)
  const [clicked, setClicked] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const [textResult, setTextResult] = React.useState("")
  const [textDesc, setTextDesc] = React.useState(
    "Tekan tombol rekam untuk mengenali emosi."
  )

  React.useEffect(() => {
    getMedia().then(stream => {
      let AudioContext = window.AudioContext // Default
        || window.webkitAudioContext // Safari and old versions of Chrome
        || false
      if (!AudioContext) alert('Your browser not supported') 
      const audioContext = new AudioContext()
      audioContext.resume().then(() => {
        console.log("Playback resumed successfully")
      })
      setStream(stream)
      setContext(audioContext)
      setSource(audioContext.createMediaStreamSource(stream))
    })
  }, [])

  const handleClick = async () => {
    setClicked(!clicked)
    if (!clicked) {
      setAnalyzer(
        Meyda.createMeydaAnalyzer({
          audioContext: context,
          source: source,
          bufferSize: 512,
          featureExtractors: ["mfcc"],
          callback: features => {
            // mfccBulk.concat(features.mfcc)
            setMfccTotal(curr => curr.concat([features.mfcc]))
            // console.log('meyda initialized')
            // console.log(features.mfcc)
          },
        })
      )
      setTextDesc("Tekan stop untuk mulai menganalisis.")
      setTextResult("Merekam...")
    } else {
      analyzer.stop()
      console.log("Analyzing...")
      setTextDesc("Mohon tunggu untuk sementara waktu.")
      setTextResult("Menganalisis suara...")
      let testingDataSource = getMeanArray(mfccTotal)
      console.log(testingDataSource)
      fetch("https://filimoml.com/speeches/predict", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          mfcc0: testingDataSource[0],
          mfcc1: testingDataSource[1],
          mfcc2: testingDataSource[2],
          mfcc3: testingDataSource[3],
          mfcc4: testingDataSource[4],
          mfcc5: testingDataSource[5],
          mfcc6: testingDataSource[6],
          mfcc7: testingDataSource[7],
          mfcc8: testingDataSource[8],
          mfcc9: testingDataSource[9],
          mfcc10: testingDataSource[10],
          mfcc11: testingDataSource[11],
          mfcc12: testingDataSource[12],
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setTextDesc("Emosi terdeteksi")
          setTextResult(getEmotionOutput(data.output[0]))
        })
      setMfccTotal([])
    }
  }

  return (
    <Layout havemenu>
      <SEO title="Analyze" />
      <Child>
        <AudioVisualizer>
          {stream ? (<AnimateAudioVisualizer />) : null}
          <ChildAudioVisualizer />
        </AudioVisualizer>
      </Child>
      <Child>
        <TxtDesc>{textDesc}</TxtDesc>
        <TxtResult>{textResult}</TxtResult>
      </Child>
      <Child>
        <ContainerVolume>
          <IconMinus />
          <SliderVolume
            onChange={handleSlider}
            volume={valueSlider}
            type="range"
            step="1"
            min="1"
            max="100"
            value={valueSlider}
          />
          <IconPlus />
        </ContainerVolume>
      </Child>
      <Child>
        <div style={{ display: "flex", justifyContent: "center", margin: 35 }}>
          <ButtonMediumOrange clicked={clicked} onClick={handleClick}>
            {clicked ? <IconStop /> : <IconMic />}
          </ButtonMediumOrange>
        </div>
      </Child>
    </Layout>
  )
}

export default AnalyzePage
