import React from "react"
import Meyda from "meyda"

function getMeanArray(arr) {
  let meanArr = arr[0].map((col, i) => {
    return arr.map(row => row[i]).reduce((acc, c) => acc + c, 0) / arr.length
  })
  return meanArr
}

// const blob = window.URL || window.webkitURL

function Train() {
  const [files, setFiles] = React.useState([])
  const [elRefs, setElRefs] = React.useState([])
  const itemsRef = React.useRef([])
  const [dataStore, setDataStore] = React.useState([])

  const handleUpload = event => {
    // event.preventDefault()
    Array.from(event.target.files).map(file => {
      setFiles(curr => curr.concat(URL.createObjectURL(file)))
    })
    itemsRef.current = itemsRef.current.slice(0, event.target.files.length)
    // setElRefs(elRefs =>
    //   Array.from(event.target.files).map((_, i) => elRefs[i] || createRef())
    // )
  }

  const [analyzer, setAnalyzer] = React.useState(null)
  const [mfccTotal, setMfccTotal] = React.useState([])
  const [label, setLabel] = React.useState("")

  const handleTrain = i => {
    setMfccTotal([])
    const audioContext = new AudioContext()
    // console.log(itemsRef.current[i])
    const source = audioContext.createMediaElementSource(itemsRef.current[i])
    source.connect(audioContext.destination)
    setAnalyzer(
      Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["mfcc"],
        callback: features => {
          setMfccTotal(curr => curr.concat([features.mfcc]))
        },
      })
    )
    // analyzer.start()
  }

  React.useLayoutEffect(() => {
    if (analyzer) {
      analyzer.start()
    }
  }, [analyzer])

  const handleStopTrain = async (i) => {
    analyzer.stop()
    let value = await getMeanArray(mfccTotal)
    setDataStore(curr => curr.concat([value]))
    console.log(i+1)
    console.log(value)
    setMfccTotal([])

    console.log("Mengupload fitur MFCC...")
      fetch(`https://filimoml.com/speeches/add`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          source: 'berlin',
          mfcc0: value[0],
          mfcc1: value[1],
          mfcc2: value[2],
          mfcc3: value[3],
          mfcc4: value[4],
          mfcc5: value[5],
          mfcc6: value[6],
          mfcc7: value[7],
          mfcc8: value[8],
          mfcc9: value[9],
          mfcc10: value[10],
          mfcc11: value[11],
          mfcc12: value[12],
          label,
        }),
      })
        .then(res => res.json())
        .then(data => console.log(data))
  }

  const handleTrainAll = (index = 0) => {
    // for (let i in files) {
      console.log(
        `[${parseFloat(index) + 1}/${files.length}] Mengekstrak fitur MFCC`
      )
      itemsRef.current[index].play()
      // if (itemsRef.current[i].ended) {
      //   console.log('end')
      // }
      itemsRef.current[index].onended = function() {
        if (index < (files.length-1)) {
          handleTrainAll(index+1)
        }
      }
      // itemsRef.current[i].addEventListener('play', () => {
      //   itemsRef.current[i].addEventListener('ended', console.log('asw'))
      // })
      // await sleep(itemsRef.current[i].duration * 1000 + 100)
    // }
  }

  // React.useLayoutEffect(() => {
  //   if (files.length > 0 && files.length === dataStore.length) {
  //     console.log(dataStore)
  //     console.log("Mengupload fitur MFCC...")
  //     fetch(`http://localhost:5000/speeches/add`, {
  //       method: "post",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         data: dataStore['0'],
  //         label,
  //         source: 'ravdess'
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(data => console.log(data))
  //   }
  // }, [dataStore])


  return (
    <div style={{ padding: 50 }}>
      <input type="file" multiple onChange={handleUpload} />
      <input
        type="text"
        placeholder="Label emosi"
        onChange={e => setLabel(e.target.value)}
      />
      <button onClick={() => handleTrainAll()}>Train</button>
      <br />
      {files
        ? files.map((file, i) => {
            return (
              <audio
                key={i}
                ref={el => (itemsRef.current[i] = el)}
                src={file}
                controls
                onPlay={() => handleTrain(i)}
                onEnded={() => handleStopTrain(i)}
                style={{ margin: 15 }}
              />
            )
          })
        : null}
    </div>
  )
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default Train
