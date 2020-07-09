import React, { PureComponent } from 'react';
import Meyda from 'meyda';
import Zdog from 'zdog';

const classes = {
  wav: {
    textAlign: 'center',
    height: '100%',
    clipPath: 'circle(105px at center)'
  },
  'wav-content': {
    height: '100%',
    width: '100%'
  },
  'zdog-canvas': {
    width: '100%',
    height: '100%',
  }
}

class AudioVisualizer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
        const emptyLoudnessArray = new Array(24).fill(0);
        this.loudness = { total: 0, specific: emptyLoudnessArray };
        this.spectralCentroid = 0;
    }

    renderCanvas() {
        const scene = new Zdog.Illustration({
            // set canvas with selector
            element: '.zdog-canvas',
            resize: true,
        });
        const boxes = [];
        const totalWidth = document.querySelector('canvas').offsetWidth;
        const totalHeight = document.querySelector('canvas').offsetHeight;
        const boxWidth = (totalWidth) / 24;
        const start = - totalWidth / 2 + boxWidth / 2;

        const padding = boxWidth / 10;
        for (let i = 0; i < 24; i++) {
            boxes[i] =            // add circle
                new Zdog.Box({
                    addTo: scene,
                    depth: (boxWidth - padding) / 2,
                    height: 1,
                    width: (boxWidth - padding) / 2,
                    color: '#E65721', // default face color
                    leftFace: '#BB241B',
                    rightFace: '#BB241B',
                    topFace: '#99ADFF',
                    bottomFace: '#99ADFF',
                    translate: { x: start + boxWidth * i },
                    rotate: {y: 0}
                });
        };


        let oldLoudness = this.loudness;
        const animate = () => {
            const newLoudness = this.loudness;
            boxes.forEach((box, i) => {
                const normalizedNewLoudness = newLoudness.specific[i];
                const normalizedOldLoudness = oldLoudness.specific[i];
                let diff = normalizedNewLoudness - normalizedOldLoudness;
                box.rotate.y += this.spectralCentroid / 1000 || 0.1;
                if (Math.abs(diff) > .025) {
                    box.scale = { y: Math.min((normalizedNewLoudness + normalizedOldLoudness) / 2  * totalHeight / 4, totalHeight - 50)};
                }

            });

            oldLoudness = newLoudness;
            scene.updateRenderGraph();
            // animate next frame
            requestAnimationFrame(animate)

        }
        // start animation
        animate();
    }

    componentDidMount() {
        // if (navigator.mediaDevices) {
        //     console.log('getUserMedia supported.');
        // }


        let audioStream;
        let mediaRecorder;
        const constraints = { audio: true };


        var onError = function(err) {
            console.log('The following error occured: ' + err);
        }

        const onSuccess = (stream) => {
            audioStream = stream;
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.onstop = function(e) {
                console.log("data available after MediaRecorder.stop() called.");
            }

            // Fired when the media recorder actually starts recording
            mediaRecorder.onstart = () => {

                const context = new AudioContext();
                const source = context.createMediaStreamSource(audioStream);
                Meyda.windowing(source, "hamming");

                const analyzer = Meyda.createMeydaAnalyzer({
                    'audioContext': context,
                    'source': source,
                    'bufferSize': 512,
                    'featureExtractors': ['loudness', 'spectralCentroid'],
                    'callback': (data) => {
                        this.loudness = data.loudness;
                        this.spectralCentroid = data.spectralCentroid;
                    }
                });


                // Start Meyda analysis
                analyzer.start();
                this.setState({
                    isLoading: false
                });

                this.renderCanvas();


            }

        }

        // Ask for permission to start recording
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess.bind(this), onError);

    }

    render() {
        const { isLoading, } = this.state;
        console.log(this.props)
        return (
            <div style={classes['wav']}>
                <div style={classes['wav-content']}>
                    {isLoading ? (
                        <h2>
                            Listening for sounds
                </h2>
                    ) : (
                            <canvas className="zdog-canvas" style={classes['zdog-canvas']}>
                            </canvas>
                        )}
                </div>
            </div>
        );
    }
}

export default AudioVisualizer;
