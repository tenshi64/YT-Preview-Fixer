const divPreviewClassName = ".html5-video-container";
var divPreview = document.querySelector(divPreviewClassName);

var volume = 0.1; //in range between 0 - 1
const delay = 2; //in milliseconds

var url = window.location.toString();
if(url.includes("youtube") && !url.includes("/watch?v=") && !url.includes("/shorts/"))
{
    if(!divPreview)
    {
        var storagedVolume = localStorage.getItem("volume");

        if (storagedVolume != null)
        {
            if(parseFloat(storagedVolume) < 0 || parseFloat(storagedVolume) > 1)
            {
                storagedVolume = 0.5;
                localStorage.setItem("volume", "0.5");
            }
            volume = parseFloat(localStorage.getItem("volume"));
        }
        else
        {
            storagedVolume = 0.5;
            localStorage.setItem("volume", "0.5");
        }
        WaitForElement(divPreviewClassName, WaitForVideoPlayer, true);
    }
    else
    {
        WaitForVideoPlayer();
    }
}

function WaitForElement(_className, _nextFunction, setDivPreview = false)
{
    var node = document.querySelector(_className);

    if(!node)
    {
        var interval = setInterval(() =>
        {
            node = document.querySelector(_className);
            if(node)
            {
                if(setDivPreview)
                {
                    divPreview = node;
                }
                _nextFunction();
                clearInterval(interval);
            }
        }, 50);
    }
    else
    {
        if(setDivPreview)
        {
            divPreview = node;
        }
        _nextFunction();
    }
}

function WaitForVideoPlayer()
{
    WaitForElement(".video-stream.html5-main-video", SpawnSlider);  
}

function SpawnSlider()
{
    //spawn the slider
    const volumeSlider = document.createElement("input");
    volumeSlider.setAttribute("type", "range");
    volumeSlider.setAttribute("class", "preview-volume-volumeSlider");
    volumeSlider.setAttribute("step", "0.01");
    volumeSlider.setAttribute("min", "0");
    volumeSlider.setAttribute("max", "1");
    volumeSlider.setAttribute("value", volume);
    volumeSlider.style.zIndex = "100";

    //spawn style, change slider's appearance
    var css = '.preview-volume-volumeSlider{opacity: 0.5; transition: 0.5s; -webkit-transition: 0.5s; -moz-transition: 0.5s; outline: 2px solid #3d3d3dff; border-radius: 5px; background:black;} .preview-volume-volumeSlider:hover{opacity: 0.8; outline: 4px solid #3d3d3dff} .preview-volume-volumeSlider::-webkit-slider-thumb{border-radius: 5px; outline: 2px solid #3d3d3dff;} .preview-volume-volumeSlider::-moz-range-thumb{border-radius: 5px; outline: 2px solid #3d3d3dff;}';
    var style = document.createElement('style');

    if (style.styleSheet)
    {
        style.styleSheet.cssText = css;
    }
    else
    {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    const mediaContainer = document.querySelector("#media-container");
    var videoPlayers = document.querySelectorAll(".video-stream.html5-main-video");

    if(mediaContainer)
    {
        document.querySelector("#media-container").append(volumeSlider);
    }
    else
    {
        delete window.volumeSlider;
    }

    volumeSlider.addEventListener("input", () => {
        ChangeVolumeInAllPlayers(videoPlayers, volume);
        volume = volumeSlider.value;
        localStorage.setItem("volume", volume.toString());
    })

    setInterval(() =>
    {
        url = window.location.toString();
        ChangeVolumeInAllPlayers(videoPlayers, volume);
        videoPlayers = document.querySelectorAll(".video-stream.html5-main-video");
    }, delay);
}

function ChangeVolumeInAllPlayers(_videoPlayers, _volume)
{
    if(url.includes("youtube") && !url.includes("/watch?v=") && !url.includes("/shorts/"))
    {
        for(var i = 0; i < _videoPlayers.length; i++)
        {
            _videoPlayers[i].volume = _volume;
        }
    }
}